import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Save, Edit, Eye, FileText } from "lucide-react";

const PrivacyManagement = () => {
  const { getPrivacy, updatePrivacy } = useAuth();
  const [privacyData, setPrivacyData] = useState({
    title: "",
    content: "",
    lastUpdated: "",
    version: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchPrivacyData();
  }, []);

  const fetchPrivacyData = async () => {
    try {
      setLoading(true);
      const response = await getPrivacy();
      if (response.data) {
        setPrivacyData(response.data);
      } else {
        // Initialize with default data if none exists
        setPrivacyData({
          title: "Privacy Policy",
          content: "Your privacy policy content goes here...",
          lastUpdated: new Date().toISOString(),
          version: "1.0",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to fetch privacy policy data",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrivacyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const updatedData = {
        ...privacyData,
        lastUpdated: new Date().toISOString(),
      };
      
      await updatePrivacy(updatedData);
      setPrivacyData(updatedData);
      setIsEditing(false);
      setMessage({
        type: "success",
        text: "Privacy policy updated successfully",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to update privacy policy",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchPrivacyData(); // Reset to original data
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00353E]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-[#00353E] mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Privacy Policy Management
              </h1>
              <p className="text-gray-600">
                Manage your website's privacy policy content
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-[#00353E] text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center px-4 py-2 bg-[#9ACD32] text-[#00353E] rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "Saving..." : "Save"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Message Display */}
      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-red-100 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Privacy Policy Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={privacyData.title}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00353E] focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Version
              </label>
              <input
                type="text"
                name="version"
                value={privacyData.version}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00353E] focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Updated
              </label>
              <input
                type="text"
                value={
                  privacyData.lastUpdated
                    ? new Date(privacyData.lastUpdated).toLocaleDateString()
                    : ""
                }
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Privacy Policy Content
            </label>
            <textarea
              name="content"
              value={privacyData.content}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={20}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00353E] focus:border-transparent disabled:bg-gray-50 font-mono text-sm"
              placeholder="Enter your privacy policy content here..."
            />
          </div>
        </div>
      </div>

      {/* Preview Section */}
      {!isEditing && (
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Eye className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
            </div>
            <div className="prose max-w-none">
              <h1 className="text-2xl font-bold mb-4">{privacyData.title}</h1>
              <div className="text-sm text-gray-500 mb-6">
                Version {privacyData.version} - Last updated:{" "}
                {privacyData.lastUpdated
                  ? new Date(privacyData.lastUpdated).toLocaleDateString()
                  : ""}
              </div>
              <div className="whitespace-pre-wrap text-gray-700">
                {privacyData.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyManagement;