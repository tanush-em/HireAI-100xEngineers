import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './table';
import { Badge } from './badge';
import { User, Mail, AlertCircle, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { CANDIDATES_API_URL } from '../config';

const CandidateTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(CANDIDATES_API_URL);
        setCandidates(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch candidates');
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-24">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-4">{error}</div>
    );
  }

  return (
    <div className="rounded-lg border shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-gray-100/80">
                  <User className="h-4 w-4 text-gray-500" />
                </div>
                <span>Candidate Name</span>
              </div>
            </TableHead>
            <TableHead className="py-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-gray-100/80">
                  <Mail className="h-4 w-4 text-gray-500" />
                </div>
                <span>Candidate Email</span>
              </div>
            </TableHead>
            <TableHead className="py-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-gray-100/80">
                  <AlertCircle className="h-4 w-4 text-gray-500" />
                </div>
                <span>Status</span>
              </div>
            </TableHead>
            <TableHead className="py-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-gray-100/80">
                  <CheckCircle2 className="h-4 w-4 text-gray-500" />
                </div>
                <span>Result</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-gray-100/80">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                  <span>{candidate.candidateName}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-gray-100/80">
                    <Mail className="h-4 w-4 text-gray-500" />
                  </div>
                  <span>{candidate.candidateEmail}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {candidate.status === 'completed' ? (
                    <div className="p-1.5 rounded-full bg-green-100">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  ) : candidate.status === 'evaluated' ? (
                    <div className="p-1.5 rounded-full bg-blue-100">
                      <AlertCircle className="h-4 w-4 text-blue-500" />
                    </div>
                  ) : (
                    <div className="p-1.5 rounded-full bg-gray-100">
                      <Clock className="h-4 w-4 text-gray-500" />
                    </div>
                  )}
                  <Badge
                    variant={candidate.status === 'completed' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {candidate.status}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {candidate.result === 'passed' ? (
                    <div className="p-1.5 rounded-full bg-green-100">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  ) : candidate.result === 'failed' ? (
                    <div className="p-1.5 rounded-full bg-red-100">
                      <XCircle className="h-4 w-4 text-red-500" />
                    </div>
                  ) : (
                    <div className="p-1.5 rounded-full bg-gray-100">
                      <Clock className="h-4 w-4 text-gray-500" />
                    </div>
                  )}
                  <Badge
                    variant={
                      candidate.result === 'passed'
                        ? 'default'
                        : candidate.result === 'failed'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className="capitalize"
                  >
                    {candidate.result}
                  </Badge>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CandidateTable;