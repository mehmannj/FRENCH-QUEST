import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Award, Download, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Certificate = () => {
  const { month } = useParams();
  const navigate = useNavigate();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCertificate();
  }, [month]);

  const fetchCertificate = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/certificates/${month}`);
      setCert(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Certificate not available');
    } finally {
      setLoading(false);
    }
  };

  const downloadCertificate = () => {
    const el = document.getElementById('certificate-card');
    if (!el) return;
    // Use html2canvas-style approach via print
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html><head><title>FrenchQuest Certificate</title>
      <style>
        body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #f1f5f9; font-family: Georgia, serif; }
        .cert { width: 800px; padding: 60px; background: white; border: 4px double #1e40af; text-align: center; }
        .cert h1 { color: #1e40af; font-size: 36px; margin-bottom: 8px; }
        .cert h2 { color: #334155; font-size: 20px; font-weight: normal; margin-bottom: 30px; }
        .cert .name { font-size: 32px; color: #0f172a; border-bottom: 2px solid #1e40af; display: inline-block; padding: 0 20px 5px; margin-bottom: 20px; }
        .cert .detail { color: #64748b; font-size: 16px; margin: 8px 0; }
        .cert .score { font-size: 24px; color: #059669; font-weight: bold; margin: 15px 0; }
        .cert .id { color: #94a3b8; font-size: 12px; margin-top: 30px; }
        @media print { body { background: white; } }
      </style></head><body>
      <div class="cert">
        <h1>FrenchQuest</h1>
        <h2>Certificate of Completion</h2>
        <p class="detail">This certifies that</p>
        <p class="name">${cert.user_name}</p>
        <p class="detail">has successfully completed</p>
        <p style="font-size:22px;color:#1e3a5f;font-weight:bold;">Month ${cert.month}: ${cert.month_title}</p>
        <p class="score">Score: ${cert.score}%</p>
        <p class="detail">Completed on ${new Date(cert.completed_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        ${cert.is_final ? '<p style="font-size:18px;color:#b45309;font-weight:bold;margin-top:15px;">Full Course Completion</p>' : ''}
        <p class="id">Certificate ID: ${cert.certificate_id}</p>
      </div>
      <script>window.onload=function(){window.print();}</script>
      </body></html>
    `);
    printWindow.document.close();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 border">
            <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Certificate Not Available</h2>
            <p className="text-slate-600 mb-6">{error}</p>
            <Button onClick={() => navigate('/roadmap')} className="rounded-full">Back to Roadmap</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8" data-testid="certificate-page">
      <div className="max-w-3xl mx-auto px-4">
        <button onClick={() => navigate('/roadmap')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Roadmap
        </button>

        <div id="certificate-card" className="bg-white rounded-2xl border-4 border-double border-blue-800 p-10 text-center mb-6">
          <div className="mb-6">
            <Award className="w-16 h-16 text-yellow-500 mx-auto mb-2" />
            <h1 className="text-4xl font-bold text-blue-800 font-serif">FrenchQuest</h1>
            <p className="text-lg text-slate-500 font-serif">Certificate of Completion</p>
          </div>

          <div className="my-8">
            <p className="text-slate-500 mb-2">This certifies that</p>
            <p className="text-3xl font-bold text-slate-900 border-b-2 border-blue-800 inline-block px-6 pb-1 font-serif">
              {cert.user_name}
            </p>
          </div>

          <p className="text-slate-500 mb-1">has successfully completed</p>
          <p className="text-xl font-bold text-blue-900 mb-4">
            Month {cert.month}: {cert.month_title}
          </p>

          <p className="text-2xl font-bold text-green-600 mb-4">Score: {cert.score}%</p>

          <p className="text-slate-500 text-sm">
            {new Date(cert.completed_at).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </p>

          {cert.is_final && (
            <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <p className="text-lg font-bold text-yellow-700">Full Course Completion</p>
              <p className="text-sm text-yellow-600">Congratulations on completing the entire FrenchQuest program!</p>
            </div>
          )}

          <p className="text-xs text-slate-400 mt-8">Certificate ID: {cert.certificate_id}</p>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={downloadCertificate} className="rounded-full gap-2 bg-blue-600 hover:bg-blue-700" data-testid="download-cert-btn">
            <Download className="w-4 h-4" /> Download / Print
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
