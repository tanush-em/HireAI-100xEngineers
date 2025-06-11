import React, { useState } from "react";
import { X } from "lucide-react";
import { MAIL_SERVER_URL } from "../config";

// Assuming these components are similar to ones already used in your project
import { Button } from "./button";
import { Input } from "./input";

const MailDialog = ({ open, onOpenChange, recipient, candidateId, candidateName }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [includeInterview, setIncludeInterview] = useState(true);

  if (!open) return null;

  const handleSendMail = async () => {
    console.log("Mail dialog props:", { recipient, candidateId, candidateName });
    
    if (!subject.trim() || !message.trim()) {
      setError("Subject and message are required");
      return;
    }
    
    // Set a default candidateId if it's not provided
    const effectiveCandidateId = candidateId || `candidate-${Date.now()}`;

    try {
      setSending(true);
      setError("");
      
      // Log the request we're about to send
      const requestBody = {
        to: recipient,
        subject,
        text: message,
        candidateId: effectiveCandidateId,
        candidateName: candidateName || "Candidate",
        includeInterview
      };
      
      console.log("Sending request to mail server:", requestBody);
      
      const response = await fetch(`${MAIL_SERVER_URL}/send-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Check if the response is ok before parsing
      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.error || `Server error: ${response.status}`);
        } catch (e) {
          throw new Error(`Server error (${response.status}): ${errorText || 'Unknown error'}`);
        }
      }

      const result = await response.json();

      if (result.success) {
        // If we got an interviewLink back, update the success message
        const successMsg = result.interviewLink 
          ? "Email with interview link sent successfully!"
          : "Email sent successfully!";
          
        setSuccess(true);
        setTimeout(() => {
          onOpenChange(false);
          setSuccess(false);
          setSubject("");
          setMessage("");
        }, 2000);
      } else {
        setError(result.error || "Failed to send email");
      }
    } catch (err) {
      console.error("Error sending email:", err);
      setError(err.message || "Error sending email. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">Send Email</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To:
            </label>
            <Input
              value={recipient}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject:
            </label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message:
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Type your message here..."
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="includeInterview"
              checked={includeInterview}
              onChange={(e) => setIncludeInterview(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="includeInterview" className="ml-2 block text-sm text-gray-700">
              Include voice interview link
            </label>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
              {includeInterview ? "Email with interview link sent successfully!" : "Email sent successfully!"}
            </div>
          )}
        </div>

        <div className="border-t p-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={sending}>
            Cancel
          </Button>
          <Button 
            onClick={handleSendMail} 
            disabled={sending}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {sending ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MailDialog;