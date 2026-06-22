import { useAuth } from "../../contexts/AuthContext";
import { getDiscountRate } from "@/services/supabaseAPI";
import { FaUser, FaStar, FaCrown, FaPercent } from "react-icons/fa";

/* Tier config */
const tierConfig = {
  Bronze:   { min: 0,    max: 100,  color: "bg-orange-400",  textColor: "text-orange-600", bgColor: "bg-orange-50" },
  Silver:   { min: 101,  max: 500,  color: "bg-gray-400",    textColor: "text-gray-600",   bgColor: "bg-gray-50" },
  Gold:     { min: 501,  max: 1000, color: "bg-yellow-400",  textColor: "text-yellow-600", bgColor: "bg-yellow-50" },
  Platinum: { min: 1001, max: 2000, color: "bg-purple-400",  textColor: "text-purple-600", bgColor: "bg-purple-50" },
};

export default function MemberDashboard() {
  const { profile } = useAuth();

  if (!profile) return <div className="p-4 text-center text-gray-400">Loading...</div>;

  const tier = profile.tier || "Bronze";
  const points = profile.points || 0;
  const discount = getDiscountRate(tier) * 100;
  const config = tierConfig[tier] || tierConfig.Bronze;

  /* Progress bar: how far into current tier range */
  const tierRange = config.max - config.min;
  const tierProgress = Math.min(((points - config.min) / tierRange) * 100, 100);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Welcome, {profile.full_name || "Member"}!
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <div className="bg-hijau rounded-full p-4 mb-4">
            <FaUser className="text-4xl text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">{profile.full_name}</h2>
          <p className="text-sm text-gray-500 mb-2">{profile.role}</p>
          <span className={`px-4 py-1 text-sm rounded-full font-medium ${config.bgColor} ${config.textColor}`}>
            {tier}
          </span>
        </div>

        {/* Points Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-yellow-100 rounded-full p-3">
              <FaStar className="text-2xl text-yellow-500" />
            </div>
            <div>
              <span className="text-3xl font-bold text-gray-800">{points}</span>
              <p className="text-sm text-gray-400">Total Points</p>
            </div>
          </div>

          {/* Tier progress */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{tier}</span>
              <span>{config.max} pts</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`${config.color} h-3 rounded-full transition-all`}
                style={{ width: `${Math.max(tierProgress, 0)}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {tier === "Platinum"
                ? "You've reached the highest tier!"
                : `${config.max - points} points to next tier`}
            </p>
          </div>
        </div>

        {/* Discount Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <FaPercent className="text-2xl text-hijau" />
            </div>
            <div>
              <span className="text-3xl font-bold text-gray-800">{discount}%</span>
              <p className="text-sm text-gray-400">Discount Rate</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            You get <b>{discount}%</b> off on every purchase as a <b>{tier}</b> member.
          </p>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 text-sm">
              <FaCrown className="text-yellow-500" />
              <span className="text-gray-600">
                Earn <b>1 point</b> per Rp 10.000 spent
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Info Table */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Tier Benefits</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-400 border-b bg-gray-50">
                <th className="p-3">Tier</th>
                <th className="p-3">Points Required</th>
                <th className="p-3">Discount</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {Object.entries(tierConfig).map(([name, cfg]) => (
                <tr key={name} className={`border-b ${name === tier ? "bg-green-50 font-semibold" : ""}`}>
                  <td className="p-3">{name} {name === tier && "(You)"}</td>
                  <td className="p-3">{cfg.min} - {cfg.max}</td>
                  <td className="p-3">{getDiscountRate(name) * 100}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
