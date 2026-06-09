import { useState } from "react";
import { FunnelKPIs, ChannelPerformance, DropOffMetric, AIAnalysisResponse } from "../types";
import { Sparkles, Brain, Check, ShieldAlert, Cpu, ArrowDownCircle, ExternalLink, HelpCircle, Loader2, Download, Filter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AIRecommendationsBoardProps {
  campaignName: string;
  description: string;
  kpis: FunnelKPIs;
  channelPerformance: ChannelPerformance[];
  dropOffs: DropOffMetric[];
}

export default function AIRecommendationsBoard({
  campaignName,
  description,
  kpis,
  channelPerformance,
  dropOffs,
}: AIRecommendationsBoardProps) {
  const [report, setReport] = useState<AIAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("ALL");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Growth-focused loading status messages representing standard consulting tasks
  const runAISteppedReport = async () => {
    setLoading(true);
    const messages = [
      "Securing analytical connection with backend Gemini node...",
      "Extracting multi-channel telemetry streams (Impressions, CTR, Visits)...",
      "Calculating cumulative drop-off vectors and margin retention coefficients...",
      "Running multi-variet comparative ad-spend leakage simulations...",
      "Generating strategic actionable growth blueprint...",
    ];

    let messageIndex = 0;
    setStatusMsg(messages[0]);
    const timer = setInterval(() => {
      messageIndex++;
      if (messageIndex < messages.length) {
        setStatusMsg(messages[messageIndex]);
      }
    }, 1500);

    try {
      const response = await fetch("/api/marketing/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignName,
          description,
          kpis,
          channelPerformance,
          dropOffs,
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setReport(data);
    } catch (err: any) {
      console.error(err);
      alert(`AI Audit Failed: ${err.message || "Ensure server is online and secrets are configured."}`);
    } finally {
      clearInterval(timer);
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Filter recommendations
  const filteredRecs = report
    ? report.recommendations.filter((rec) => {
        if (difficultyFilter === "ALL") return true;
        return rec.difficulty === difficultyFilter;
      })
    : [];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs relative overflow-hidden" id="ai-auditor-section">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50 pb-5">
        <div className="flex gap-3">
          <div className="p-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl text-white flex items-center justify-center shadow-xs">
            <Cpu className="w-5 h-5 text-indigo-100" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
              AI Conversion & CRO Performance Auditor
              <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold uppercase px-2 py-0.5 rounded-full">
                Gemini 3.5
              </span>
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">
              Consult a server-side AI model to isolate conversions checkpoints, detect campaign leakages, and optimize ad spend.
            </p>
          </div>
        </div>

        {!loading && !report && (
          <button
            onClick={runAISteppedReport}
            id="btn-run-ai-audit"
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-indigo-200 animate-pulse" />
            Launch AI CRO Audit
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center text-slate-600"
            id="ai-loading-panel"
          >
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            <h4 className="font-semibold text-sm text-slate-800 mt-4">Growth Intelligence Analyzing...</h4>
            
            {/* Displaying staggered growth diagnostics status strings */}
            <p className="text-xs text-slate-500 mt-2 font-mono h-6 transition-all duration-300">
              {statusMsg}
            </p>

            <div className="w-48 bg-slate-100 rounded-full h-1 mt-6 overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full animate-bar" style={{ width: "60%" }} />
            </div>
          </motion.div>
        )}

        {!loading && report && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 space-y-6"
            id="ai-report-body"
          >
            {/* Header diagnostic overview cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Executive summary */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Cohort Summary Protocol
                </span>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                  {report.summary}
                </p>
              </div>

              {/* Isolated key bottleneck */}
              <div className="bg-amber-50/50 p-5 rounded-xl border border-amber-100 flex flex-col justify-between">
                <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> High Friction Leakage
                </span>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                  {report.keyBottleneck}
                </p>
              </div>

              {/* Channel contrasts */}
              <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100 flex flex-col justify-between">
                <span className="text-[10px] text-indigo-800 font-bold uppercase tracking-wider block">
                  Channel ROI Contrast
                </span>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                  {report.channelComparison}
                </p>
              </div>
            </div>

            {/* Strategic analytics observations */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider mt-4 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Brain className="w-4 h-4 text-indigo-500" />
                Strategic Insights
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {report.insights.map((ins, insIdx) => {
                  const tagColor =
                    ins.impact === "HIGH"
                      ? "bg-rose-100 text-rose-700"
                      : ins.impact === "MEDIUM"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-700";

                  return (
                    <div
                      key={insIdx}
                      className="bg-white border border-slate-100 rounded-xl p-4.5 hover:border-indigo-100 transition-all shadow-3xs hover:shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${tagColor}`}>
                          IMPACT: {ins.impact}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Affects: {ins.metricAffected}</span>
                      </div>

                      <h5 className="font-semibold text-slate-800 text-xs mt-3">{ins.title}</h5>
                      <p className="text-[11.5px] text-slate-500 mt-1 leading-relaxed">
                        {ins.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CRO Actionable guidelines */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-2">
                <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ArrowDownCircle className="w-4 h-4 text-emerald-500" />
                  Growth Actionable Guidelines
                </h4>

                {/* Filter buttons */}
                <div className="flex items-center gap-2 select-none">
                  <Filter className="w-3 h-3 text-slate-400" />
                  <span className="text-[10px] text-slate-400 font-medium">Difficulty:</span>

                  {["ALL", "EASY", "MEDIUM", "HARD"].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficultyFilter(diff)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-md cursor-pointer transition-all ${
                        difficultyFilter === diff
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100/85 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of custom Recommendation actionable cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRecs.map((rec, rIdx) => {
                  const badgeStyle =
                    rec.difficulty === "EASY"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : rec.difficulty === "MEDIUM"
                      ? "bg-blue-50 text-blue-700 border-blue-100"
                      : "bg-rose-50 text-rose-700 border-rose-100";

                  return (
                    <div
                      key={rIdx}
                      className="border border-slate-100 rounded-xl p-5 bg-slate-50/20 hover:bg-white hover:border-slate-200 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold border rounded-md px-2 py-0.5 ${badgeStyle}`}>
                            {rec.difficulty}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Channel: {rec.channelAffected}
                          </span>
                        </div>

                        <h5 className="font-bold text-slate-800 text-xs mt-3.5">{rec.title}</h5>
                        <p className="text-[11.5px] text-slate-600 mt-1.5 leading-relaxed bg-white/70 border border-slate-100/50 p-2.5 rounded-lg">
                          {rec.actionableStep}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-medium select-none">
                          Ready for execution
                        </span>
                        <button
                          onClick={() => copyToClipboard(rec.actionableStep, rIdx)}
                          className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-700 transition"
                        >
                          {copiedIndex === rIdx ? "Copied!" : "Copy growth hack"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action control */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <p className="text-[10px] text-slate-400">
                AI observations are constructed based on live statistical campaign rates.
              </p>
              
              <button
                onClick={() => {
                  // Re-trigger live audit report
                  runAISteppedReport();
                }}
                className="text-[10px] font-semibold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                Re-Deploy CRO Analysis
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && !report && (
        <div className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-100 border-dashed rounded-xl mt-6 text-center select-none">
          <Brain className="w-8 h-8 text-slate-400" />
          <h4 className="font-semibold text-slate-700 text-xs mt-3 leading-none">AI Conversion Blueprint Ready</h4>
          <p className="text-[11px] text-slate-400 mt-1 max-w-sm leading-relaxed">
            Unleash the Gemini Growth Oracle to review the current active dataset. The AI will isolate conversion leakages, compare waste vectors, and draft step-by-step landing page fixes.
          </p>
        </div>
      )}
    </div>
  );
}
