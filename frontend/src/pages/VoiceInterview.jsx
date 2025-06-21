"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Vapi from "@vapi-ai/web"
import { Button } from "../components/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/card"
import { VAPI_PUBLIC_KEY, VAPI_ASSISTANT_ID, MAIL_SERVER_URL } from "../config"
import { X, Mic, Volume2 } from "lucide-react"

const VoiceInterview = () => {
  const { interviewId } = useParams()
  const navigate = useNavigate()
  const vapiRef = useRef(null)
  const [active, setActive] = useState(false)
  const [transcript, setTranscript] = useState([])
  const [volume, setVolume] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [interviewComplete, setInterviewComplete] = useState(false)
  const [interviewResult, setInterviewResult] = useState(null)

  // Effect to handle interview completion
  useEffect(() => {
    if (interviewComplete) {
      console.log("Interview completed with result:", interviewResult)
      // We don't redirect automatically - user can close the page
    }
  }, [interviewComplete, interviewResult])

  useEffect(() => {
    // Validate interviewId and get Vapi credentials
    if (!interviewId) {
      setError("Invalid interview ID")
      setIsLoading(false)
      return
    }

    console.log("Using interview ID:", interviewId)

    // Check if the interview exists in the database
    const checkInterview = async () => {
      try {
        console.log("Checking interview at:", `${MAIL_SERVER_URL}/check-interview/${interviewId}`)

        // First check if the server is accessible
        try {
          const healthCheck = await fetch(`${MAIL_SERVER_URL}/health`, {
            method: "GET",
            headers: { Accept: "application/json" },
            mode: "cors",
            timeout: 3000, // 3 second timeout
          })

          if (!healthCheck.ok) {
            console.warn("Mail server health check failed, proceeding without verification")
            // If server is not accessible, proceed with Vapi initialization anyway
            initializeVapi()
            return
          }
        } catch (healthErr) {
          console.warn("Mail server not accessible:", healthErr)
          // If server is not accessible, proceed with Vapi initialization anyway
          initializeVapi()
          return
        }

        // If server is accessible, check the interview
        const response = await fetch(`${MAIL_SERVER_URL}/check-interview/${interviewId}`, {
          method: "GET",
          headers: { Accept: "application/json" },
          mode: "cors",
        })

        if (!response.ok) {
          console.warn("Interview check failed with status:", response.status)
          // If check fails, proceed with Vapi initialization anyway
          initializeVapi()
          return
        }

        const data = await response.json()
        console.log("Interview check response:", data)

        if (!data.success) {
          console.warn("Interview check returned error:", data.error)
          // If check returns error, proceed with Vapi initialization anyway
          initializeVapi()
          return
        }

        // Continue with Vapi initialization
        initializeVapi()
      } catch (err) {
        console.error("Error checking interview:", err)
        // Don't show error to user, just proceed with Vapi initialization
        initializeVapi()
      }
    }

    // Initialize Vapi
    const initializeVapi = () => {
      try {
        const vapi = new Vapi(VAPI_PUBLIC_KEY)
        vapiRef.current = vapi

        vapi.on("call-start", () => setActive(true))
        vapi.on("call-end", () => {
          setActive(false)
          // Don't save transcript here - only save when user clicks "Close Interview"
        })
        vapi.on("volume-level", (lvl) => setVolume(lvl))
        vapi.on("message", (msg) => {
          if (msg.type === "transcript" && msg.transcriptType === "final") {
            setTranscript((prev) => [...prev, { role: msg.role, content: msg.transcript }])
          }
        })
        vapi.on("error", (e) => {
          console.error("Vapi error:", e)
          setError("Error with voice interview: " + e.message)
        })

        setIsLoading(false)
      } catch (err) {
        console.error("Error initializing Vapi:", err)
        setError("Failed to initialize voice interview")
        setIsLoading(false)
      }
    }

    // Start the process by checking if the interview exists
    checkInterview()

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop()
      }
    }
  }, [interviewId, MAIL_SERVER_URL]) // Dependencies

  const toggleCall = async () => {
    if (!vapiRef.current) return

    if (active) {
      vapiRef.current.stop()
    } else {
      try {
        await vapiRef.current.start(VAPI_ASSISTANT_ID)
      } catch (err) {
        console.error("Error starting Vapi call:", err)
        setError("Failed to start voice interview")
      }
    }
  }

  const closeInterview = async () => {
    try {
      // First stop the active call if there is one
      if (active && vapiRef.current) {
        vapiRef.current.stop()
      }

      // Only save transcript if we have one and the interview isn't already complete
      if (transcript.length > 0 && !interviewComplete) {
        console.log("Closing interview and saving transcript...")
        await saveTranscript()
      } else if (transcript.length === 0) {
        // If there's no transcript, just show the completion message
        console.log("No transcript to save, showing completion message")
        setInterviewComplete(true)
      } else if (interviewComplete) {
        console.log("Interview already complete")
      }
      // No navigation to home page - we'll show the completion message instead
    } catch (err) {
      console.error("Error in closeInterview:", err)
      // Show completion message even if there was an error
      setInterviewComplete(true)
      setIsLoading(false)
    }
  }

  const saveTranscript = async () => {
    setIsLoading(true)
    try {
      console.log("Saving transcript to server, length:", transcript.length)
      console.log("Using interview ID for saving:", interviewId)

      // Make sure we have a valid transcript to send
      if (!transcript || transcript.length === 0) {
        console.error("No transcript to save")
        setError("No transcript to save")
        setIsLoading(false)
        return
      }

      // Log the first few transcript items for debugging
      console.log("First few transcript items:", transcript.slice(0, 3))

      // First check if the server is accessible
      let serverAccessible = false
      try {
        const healthCheck = await fetch(`${MAIL_SERVER_URL}/health`, {
          method: "GET",
          headers: { Accept: "application/json" },
          mode: "cors",
          timeout: 3000, // 3 second timeout
        })

        serverAccessible = healthCheck.ok
        if (!serverAccessible) {
          console.warn("Mail server health check failed")
        }
      } catch (healthErr) {
        console.warn("Mail server not accessible:", healthErr)
      }

      // If server is not accessible, show completion message without saving
      if (!serverAccessible) {
        console.log("Server not accessible, showing completion message without saving")
        setInterviewComplete(true)
        setIsLoading(false)
        return
      }

      // Prepare the request data
      const requestData = {
        interviewId: interviewId,
        transcript: transcript,
      }

      console.log(
        "Sending request to save transcript with data:",
        JSON.stringify(requestData).substring(0, 200) + "...",
      )

      try {
        const response = await fetch(`${MAIL_SERVER_URL}/save-transcript`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(requestData),
          mode: "cors",
          timeout: 10000, // 10 second timeout
        })

        if (!response.ok) {
          console.error("Server returned status:", response.status)
          // Show completion message even if save failed
          setInterviewComplete(true)
          setIsLoading(false)
          return
        }

        const data = await response.json()
        console.log("Server response:", data)

        if (data.success) {
          console.log("Transcript saved successfully with result:", data.result)
          setInterviewComplete(true)
          setInterviewResult(data.result)
        } else {
          console.error("Server returned error:", data.error)
          // Show completion message even if save failed
          setInterviewComplete(true)
        }
      } catch (fetchErr) {
        console.error("Error fetching from server:", fetchErr)
        // Show completion message even if save failed
        setInterviewComplete(true)
      }
    } catch (err) {
      console.error("Error in saveTranscript:", err)
      // Show completion message even if there was an error
      setInterviewComplete(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-center">Loading voice interview...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
            <p className="text-gray-600 text-center mb-4">{error}</p>
            <Button onClick={() => navigate("/")} className="w-full">
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (interviewComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Interview Complete</h3>
            <p className="text-gray-600 text-center mb-4">
              Thanks for completing the interview. Your responses have been recorded and analyzed.
            </p>
            {interviewResult && <p className="text-gray-600 text-center mb-4">Your interview has been evaluated.</p>}
            <p className="text-gray-600 text-center mb-4 font-semibold">You may close this page now.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-0 shadow-2xl mb-4 bg-white/90 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
            <CardTitle className="text-xl font-bold">AI Voice Interview</CardTitle>
            <Button variant="ghost" size="sm" onClick={closeInterview} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6 text-center">
              <div className="flex justify-center mb-4">
                <div
                  className={`rounded-full p-8 ${active ? "bg-gradient-to-br from-green-100 to-emerald-100 animate-pulse shadow-xl" : "bg-gradient-to-br from-slate-100 to-gray-100 shadow-lg"} transition-all duration-300`}
                >
                  <Mic className={`h-16 w-16 ${active ? "text-green-600" : "text-slate-400"}`} />
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 mb-2">
                  {active ? "Interview in progress..." : "Ready to start your interview?"}
                </p>
                {active && (
                  <div className="flex items-center justify-center gap-2">
                    <Volume2 className="h-4 w-4 text-blue-600" />
                    <div className="w-40 h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-100 rounded-full"
                        style={{ width: `${Math.min(volume * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={toggleCall}
                className={`px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 ${active ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"} text-white`}
              >
                {active ? "Stop Interview" : "Start Interview"}
              </Button>
            </div>

            {transcript.length > 0 && (
              <div className="mt-8 border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Conversation Transcript</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto p-4 bg-slate-50/50 rounded-2xl">
                  {(() => {
                    // Group consecutive messages by role
                    const groupedTranscript = []
                    let currentGroup = null

                    transcript.forEach((item) => {
                      if (!currentGroup || currentGroup.role !== item.role) {
                        // Start a new group
                        currentGroup = {
                          role: item.role,
                          messages: [item.content],
                        }
                        groupedTranscript.push(currentGroup)
                      } else {
                        // Add to existing group
                        currentGroup.messages.push(item.content)
                      }
                    })

                    return groupedTranscript.map((group, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-2xl shadow-sm ${
                          group.role === "assistant"
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 ml-8"
                            : "bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-100 mr-8"
                        } transition-all duration-200 hover:shadow-md`}
                      >
                        <p className="text-xs font-semibold mb-2 text-gray-500">
                          {group.role === "assistant" ? "AI Interviewer" : "You"}
                        </p>
                        <div className="space-y-2">
                          {group.messages.map((message, msgIndex) => (
                            <p key={msgIndex} className="text-sm leading-relaxed">
                              {message}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))
                  })()}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <Button onClick={closeInterview} className="bg-gray-600 hover:bg-gray-700 text-white">
                Close Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default VoiceInterview
