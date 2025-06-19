import React from "react"
import { useState, useEffect } from "react"
import {
  Users,
  Trophy,
  TrendingUp,
  Star,
  Mail,
  Linkedin,
  GraduationCap,
  Briefcase,
  Code,
  X,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Search,
  Download,
  RefreshCw,
  Send,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Button } from "../components/button"
import { Input } from "../components/input"
import { Badge } from "../components/badge"
import { Separator } from "../components/separator"
import MailDialog from "../components/MailDialog"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/chart"
import CandidateTable from "../components/CandidateTable"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { API_BASE_URL, MAIL_SERVER_URL } from '../config';

const ResumeDashboard = () => {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [sortBy, setSortBy] = useState("rank")
  const [sortOrder, setSortOrder] = useState("asc")
  const [expandedRows, setExpandedRows] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState("")
  const [filterScore, setFilterScore] = useState("")
  const [mailDialogOpen, setMailDialogOpen] = useState(false)
  const [mailRecipient, setMailRecipient] = useState("")
  const [mailCandidateId, setMailCandidateId] = useState("")
  const [mailCandidateName, setMailCandidateName] = useState("")

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/candidates`)
      const result = await response.json()

      if (result.success) {
        setCandidates(result.data)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("Failed to fetch data")
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  const totalCandidates = candidates.length
  const averageScore =
    candidates.length > 0 ? Math.round(candidates.reduce((sum, c) => sum + c.score, 0) / candidates.length) : 0
  const topPerformer =
    candidates.length > 0 ? candidates.reduce((max, c) => (c.score > max.score ? c : max), candidates[0]) : null
  const skillDistribution = candidates.reduce((acc, candidate) => {
    candidate.skills?.forEach((skill) => {
      acc[skill] = (acc[skill] || 0) + 1
    })
    return acc
  }, {})

  const topSkills = Object.entries(skillDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }))

  const topCandidatesByScore = [...candidates]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((candidate) => ({
      name: candidate.name,
      score: candidate.score,
      color:
        candidate.score >= 90
          ? "#10b981"
          : candidate.score >= 80
            ? "#3b82f6"
            : candidate.score >= 70
              ? "#f59e0b"
              : candidate.score >= 60
                ? "#f97316"
                : "#ef4444",
    }))

  const chartConfig = {
    count: {
      label: "Candidates",
      color: "hsl(var(--chart-1))",
    },
    skill: {
      label: "Skill",
      color: "hsl(var(--chart-2))",
    },
  }

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.mail?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesScore =
      filterScore === "" ||
      (filterScore === "90+" && candidate.score >= 90) ||
      (filterScore === "80-89" && candidate.score >= 80 && candidate.score < 90) ||
      (filterScore === "70-79" && candidate.score >= 70 && candidate.score < 80) ||
      (filterScore === "60-69" && candidate.score >= 60 && candidate.score < 70) ||
      (filterScore === "0-59" && candidate.score < 60)
    return matchesSearch && matchesScore
  })

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === "score") {
      if (sortOrder === "asc") {
        return b.score - a.score
      } else {
        return a.score - b.score
      }
    }
    return a.rank - b.rank
  })

  const handleSort = (field) => {
    if (field === "score") {
      if (sortBy === field) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
      } else {
        setSortBy(field)
        setSortOrder("asc")
      }
    }
  }

  const toggleRowExpansion = (candidateId) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(candidateId)) {
      newExpanded.delete(candidateId)
    } else {
      newExpanded.add(candidateId)
    }
    setExpandedRows(newExpanded)
  }

  const getRankBadgeColor = (rank) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg"
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500 text-white shadow-lg"
    if (rank === 3) return "bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-lg"
    if (rank <= 10) return "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
    return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 shadow-sm"
  }

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600 font-bold"
    if (score >= 80) return "text-blue-600 font-semibold"
    if (score >= 70) return "text-yellow-600 font-semibold"
    if (score >= 60) return "text-orange-600 font-medium"
    return "text-red-600 font-medium"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-center">Loading dashboard...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
            <p className="text-gray-600 text-center mb-4">{error}</p>
            <Button onClick={fetchCandidates} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                Candidates Ranking Dashboard
              </h1>
              <p className="text-gray-600 text-lg">Comprehensive analytics and candidate insights</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={fetchCandidates} size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Candidates</p>
                  <p className="text-3xl font-bold">{totalCandidates}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Average Score</p>
                  <p className="text-3xl font-bold">{averageScore}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">Top Performer</p>
                  <p className="text-lg font-bold truncate">{topPerformer?.name || "N/A"}</p>
                  <p className="text-yellow-100 text-sm">Score: {topPerformer?.score || 0}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <Trophy className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Top Skill</p>
                  <p className="text-lg font-bold truncate">{topSkills[0]?.skill || "N/A"}</p>
                  <p className="text-purple-100 text-sm">{topSkills[0]?.count || 0} candidates</p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <Star className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
          {/* Top Skills Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">Top Skills Distribution</CardTitle>
              </div>
              <CardDescription>Most in-demand skills across all candidates</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ChartContainer config={chartConfig} className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topSkills} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="skill" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} className="fill-blue-500" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Top Candidates Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <CardTitle className="text-lg">Top Candidates</CardTitle>
              </div>
              <CardDescription>Top {topCandidatesByScore.length} performers by score</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ChartContainer config={chartConfig} className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topCandidatesByScore}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} className="opacity-30" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={100}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => (value.length > 15 ? `${value.substring(0, 15)}...` : value)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                      {topCandidatesByScore.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Candidates Table */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader className="pb-2">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">Candidate Rankings</CardTitle>
                </div>
                <CardDescription>Sorted by {sortBy === "rank" ? "rank" : "score"}</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search candidates..."
                    className="pl-8 w-full sm:w-[200px] lg:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-5 pr-10 py-2.5 rounded-lg border border-gray-300 bg-white shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out hover:border-gray-400 hover:shadow-md appearance-none"
                  value={filterScore}
                  onChange={(e) => setFilterScore(e.target.value)}
                >
                  <option value="">All Scores</option>
                  <option value="90+">90+</option>
                  <option value="80-89">80-89</option>
                  <option value="70-79">70-79</option>
                  <option value="60-69">60-69</option>
                  <option value="0-59">Below 60</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 lg:px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider">
                      Rank
                    </th>
                    <th className="px-4 lg:px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider">
                      Candidate
                    </th>
                    <th
                      className="px-4 lg:px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider cursor-pointer"
                      onClick={() => handleSort("score")}
                    >
                      <div className="flex items-center">
                        Score
                        {sortBy === "score" && (
                          <span className="ml-1">
                            {sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="hidden lg:table-cell px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider">
                      Skills
                    </th>
                    <th className="px-4 lg:px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider">
                      Candidate Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedCandidates.map((candidate) => {
                    const candidateId = candidate._id?.$oid || candidate._id || candidate.id;
                    const isExpanded = expandedRows.has(candidateId);
                    return (
                      <React.Fragment key={candidateId}>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <Badge className={`${getRankBadgeColor(candidate.rank)}`}>
                              {candidate.rank}
                            </Badge>
                          </td>
                          <td className="px-4 lg:px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
                                <span className="text-sm font-medium text-white">
                                  {candidate.name?.charAt(0)?.toUpperCase() || "?"}
                                </span>
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                                <p className="text-xs text-gray-500">{candidate.mail}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className={`text-lg ${getScoreColor(candidate.score)}`}>{candidate.score}</div>
                          </td>
                          <td className="hidden lg:table-cell px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {candidate.skills?.slice(0, 3).map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {candidate.skills?.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{candidate.skills.length - 3}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 text-sm text-gray-500">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleRowExpansion(candidateId)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedCandidate(candidate)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  View
                                </Button>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setMailDialogOpen(true)
                                      setMailRecipient(candidate.mail)
                                      setMailCandidateId(candidate._id?.$oid || candidate._id || candidate.id)
                                      setMailCandidateName(candidate.name)
                                    }}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    <Send className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>

                        {/* Expanded Row */}
                        {isExpanded && (
                          <tr className="bg-gray-50">
                            <td colSpan={5} className="px-4 lg:px-6 py-4">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                                    <GraduationCap className="h-4 w-4 mr-2" />
                                    Education
                                  </h4>
                                  <p className="text-sm text-gray-700">{candidate.education}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                                    <Briefcase className="h-4 w-4 mr-2" />
                                    Work Experience
                                  </h4>
                                  <p className="text-sm text-gray-700 line-clamp-3">{candidate.work_experience}</p>
                                </div>
                                <div className="lg:col-span-2">
                                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                                    <Code className="h-4 w-4 mr-2" />
                                    All Skills ({candidate.skills?.length || 0})
                                  </h4>
                                  <div className="flex flex-wrap gap-1">
                                    {candidate.skills?.map((skill, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Interview Status</CardTitle>
            <CardDescription>Overview of all candidate interviews and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <CandidateTable />
          </CardContent>
        </Card>

        {/* Candidate Detail Modal */}
        {selectedCandidate && (
          <div className="fixed inset-0 bg-white overflow-y-auto h-full w-full z-50">
            <div className="container mx-auto px-4 py-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">Candidate Profile</CardTitle>
                        <CardDescription>Detailed information and analytics</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCandidate(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Basic Info */}
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                        <span className="text-xl font-medium text-white">
                          {selectedCandidate.name?.charAt(0)?.toUpperCase() || "?"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900">{selectedCandidate.name}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                          <div className="flex items-center text-gray-600">
                            <Mail className="h-4 w-4 mr-1" />
                            <span className="text-sm">{selectedCandidate.mail}</span>
                          </div>
                          {selectedCandidate.linkedin && (
                            <div className="flex items-center text-gray-600">
                              <Linkedin className="h-4 w-4 mr-1" />
                              <a
                                href={`https://linkedin.com/${selectedCandidate.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline"
                              >
                                LinkedIn Profile
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Score and Rank */}
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="border border-yellow-200 bg-yellow-50">
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            <Trophy className="h-5 w-5 text-yellow-600 mr-2" />
                            <span className="text-sm font-medium text-gray-600">Rank</span>
                          </div>
                          <div className="mt-2">
                            <Badge className={`${getRankBadgeColor(selectedCandidate.rank)} text-lg px-3 py-1`}>
                              {selectedCandidate.rank}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border border-blue-200 bg-blue-50">
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-blue-600 mr-2" />
                            <span className="text-sm font-medium text-gray-600">Score</span>
                          </div>
                          <div className="mt-2">
                            <span className={`text-2xl font-bold ${getScoreColor(selectedCandidate.score)}`}>
                              {selectedCandidate.score}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">/100</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Education */}
                    <div>
                      <div className="flex items-center mb-3">
                        <GraduationCap className="h-5 w-5 text-gray-600 mr-2" />
                        <h5 className="font-semibold text-gray-900">Education</h5>
                      </div>
                      <Card className="border border-gray-200">
                        <CardContent className="p-4">
                          <p className="text-gray-700 whitespace-pre-line">{selectedCandidate.education}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Work Experience */}
                    <div>
                      <div className="flex items-center mb-3">
                        <Briefcase className="h-5 w-5 text-gray-600 mr-2" />
                        <h5 className="font-semibold text-gray-900">Work Experience</h5>
                      </div>
                      <Card className="border border-gray-200">
                        <CardContent className="p-4">
                          <p className="text-gray-700 whitespace-pre-line">{selectedCandidate.work_experience}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Skills */}
                    <div>
                      <div className="flex items-center mb-3">
                        <Code className="h-5 w-5 text-gray-600 mr-2" />
                        <h5 className="font-semibold text-gray-900">Skills ({selectedCandidate.skills?.length || 0})</h5>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.skills?.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Mail Dialog */}
        <MailDialog
          open={mailDialogOpen}
          onOpenChange={setMailDialogOpen}
          recipient={mailRecipient}
          candidateId={mailCandidateId}
          candidateName={mailCandidateName}
        />
      </div>
    </div>
  )
}

export default ResumeDashboard