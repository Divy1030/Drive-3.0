'use client'
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function FileList({ account, contract }: { account: string | null, contract: unknown }) {
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const [files, setFiles] = useState<{ name: string; size: number; url?: string; date?: string; hash?: string }[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'size' | 'date'>('name');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch files from contract (on-chain access control)
  const fetchFiles = useCallback(async () => {
    if (!account || !contract) {
      setFiles([]);
      return;
    }
    setLoading(true);
    try {
      // If ownerAddress is empty, show own files

      const addressToFetch = ownerAddress.trim() === "" ? account : ownerAddress.trim();
      // @ts-expect-error: contract type is unknown, but we expect display to exist at runtime
      const dataArray = await contract.display(addressToFetch);
      const filesList = (dataArray || [])
        .filter((item: string) => !!item)
        .map((item: string) => {
          let hash = item.startsWith("https://") ? item.split("/").pop() : item;
          if (item.startsWith("ipfs://")) hash = item.substring(7);
          return {
            name: hash,
            url: `https://gateway.pinata.cloud/ipfs/${hash}`,
            hash,
          };
        });
      setFiles(filesList);
    } catch {
      setFiles([]);
    }
    setLoading(false);
  }, [account, contract, ownerAddress]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleDelete = async (hash: string) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    setDeleting(hash);
    try {
      await axios.delete("/api/delete", { data: { hash } });
      setFiles((prev) => prev.filter((file) => file.hash !== hash));
    } catch {
      alert("Failed to delete file.");
    }
    setDeleting(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return (
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="14,2 14,8 20,8" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="12" y="16" textAnchor="middle" fill="#dc2626" fontSize="8" fontWeight="bold">PDF</text>
            </svg>
          </div>
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return (
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#16a34a" strokeWidth="2"/>
              <circle cx="8.5" cy="8.5" r="1.5" stroke="#16a34a" strokeWidth="2"/>
              <polyline points="21,15 16,10 5,21" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      case 'doc':
      case 'docx':
        return (
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="14,2 14,8 20,8" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="12" y="16" textAnchor="middle" fill="#2563eb" fontSize="7" fontWeight="bold">DOC</text>
            </svg>
          </div>
        );
      case 'mp4':
      case 'avi':
      case 'mov':
      case 'wmv':
        return (
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <polygon points="23 7 16 12 23 17 23 7" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="#7c3aed" strokeWidth="2"/>
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="14,2 14,8 20,8" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
    }
  };

  const sortedFiles = files.sort((a, b) => {
    switch (sortBy) {
      case 'size':
        return b.size - a.size;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return (b.date ? new Date(b.date).getTime() : 0) - (a.date ? new Date(a.date).getTime() : 0);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white/25 dark:bg-blue-900/20 backdrop-blur-xs rounded-3xl shadow-2xl border border-blue-200/20 dark:border-blue-700/20 w-full max-w-4xl overflow-hidden transition-colors duration-300">
        
        {/* Header */}
        <div className="bg-white/20 dark:bg-blue-900/30 backdrop-blur-xs px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Your Files</h2>
                <p className="text-slate-200 text-sm">{files.length} {files.length === 1 ? 'file' : 'files'} stored</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Refresh Button */}
              <button
                onClick={fetchFiles}
                disabled={loading}
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                title="Refresh"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4v5h.582M20 20v-5h-.581M5.077 19A9 9 0 1 0 6 6.26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {loading ? "Refreshing..." : "Refresh"}
              </button>

              {/* View Mode Toggle */}
              <div className="bg-white/10 rounded-lg p-1 flex">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white/20 text-white' 
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="3" y1="6" x2="3.01" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="3" y1="12" x2="3.01" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="3" y1="18" x2="3.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white/20 text-white' 
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'size' | 'date')}
                className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                <option value="name" className="text-zinc-900">Sort by Name</option>
                <option value="size" className="text-zinc-900">Sort by Size</option>
              </select>
            </div>
          </div>
          {/* Uploader address input for allowed users */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter uploader address to view shared files"
              value={ownerAddress}
              onChange={e => setOwnerAddress(e.target.value)}
              className="mb-2 px-3 py-2 rounded border w-full max-w-md"
            />
            {/* <p className="text-xs text-slate-400">
              Leave blank to view your own files.
            </p> */}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {files.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2">No files yet</h3>
              <p className="text-zinc-500 dark:text-zinc-400">Upload your first file to get started with your decentralized storage.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
              {sortedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className={`bg-white/30 dark:bg-zinc-800/30 rounded-xl border border-zinc-200/20 dark:border-zinc-700/20 hover:shadow-lg transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600 group ${
                    viewMode === 'grid' ? 'p-6' : 'p-4'
                  }`}
                >
                  <div className={`flex ${viewMode === 'grid' ? 'flex-col items-center text-center' : 'items-center justify-between'}`}>
                    <div className={`flex ${viewMode === 'grid' ? 'flex-col items-center' : 'items-center gap-4'}`}>
                      {getFileIcon(file.name)}
                      <div className={viewMode === 'grid' ? 'mt-4' : ''}>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                          {file.name}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-2 ${viewMode === 'grid' ? 'mt-4 w-full' : ''}`}>
                      {file.url && (
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                            viewMode === 'grid' ? 'w-full justify-center' : ''
                          }`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          View
                        </a>
                      )}
                      {file.hash && (
                        <button
                          onClick={() => handleDelete(file.hash!)}
                          disabled={deleting === file.hash}
                          className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                            viewMode === 'grid' ? 'w-full justify-center' : ''
                          } ${deleting === file.hash ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" stroke="currentColor" strokeWidth="2"/>
                            <path d="M10 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          {deleting === file.hash ? "Deleting..." : "Delete"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}