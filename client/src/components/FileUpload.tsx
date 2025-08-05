'use client';

import React, { useRef, useState } from "react";

// Placeholder for allowed users
const allowedUsers = [
  "0x1234...abcd",
  "0x5678...efgh",
];

export default function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'users'>('upload');
  const [walletAddress, setWalletAddress] = useState('');

  const handleAddUser = () => {
    // Add user logic here
    if (walletAddress.trim()) {
      setWalletAddress('');
    }
  };

  return (
    <div className="w-full flex justify-center">
      {/* Main Modal Card */}
      <div className="bg-white/25 dark:bg-blue-900/20 backdrop-blur-xs rounded-3xl shadow-2xl border border-blue-200/20 dark:border-blue-700/20 w-full max-w-4xl overflow-hidden transition-colors duration-300">
        {/* Tab Navigation */}
        <div className="flex border-b border-blue-100/40 dark:border-zinc-800/40 bg-white/20 dark:bg-blue-900/30 backdrop-blur-xs">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-200 ${
              activeTab === 'upload'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-blue-50 dark:hover:bg-zinc-800/50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Upload Files
            </div>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-200 ${
              activeTab === 'users'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-blue-50 dark:hover:bg-zinc-800/50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Manage Users
            </div>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {activeTab === 'upload' ? (
            // Upload Tab Content
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-full shadow-lg">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="7,10 12,15 17,10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="15" x2="12" y2="3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Upload Files</h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-center max-w-md">
                  Store your files securely on the decentralized network and access them from anywhere.
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple
              />

              <div className="w-full max-w-sm space-y-4">
                <button
                  type="button"
                  className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-lg flex items-center justify-center gap-3"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="18" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="9" y1="15" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Select Files
                </button>
                
                <div className="text-center">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Max file size: 100MB per file</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">Supported formats: All file types</p>
                </div>
              </div>
            </div>
          ) : (
            // Users Tab Content
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 rounded-full shadow-lg w-fit mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/>
                    <line x1="19" y1="8" x2="19" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="22" y1="11" x2="16" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Manage Users</h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                  Add wallet addresses to grant access to your files
                </p>
              </div>

              {/* Add User Form */}
              <div className="bg-white/30 dark:bg-blue-900/30 backdrop-blur-xs rounded-2xl p-6 border border-zinc-200/20 dark:border-zinc-700/20">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Add New User
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Wallet Address
                    </label>
                    <input
                      type="text"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      placeholder="0x1234567890abcdef..."
                      className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleAddUser}
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold shadow-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Add User
                  </button>
                </div>
              </div>

              {/* Current Users List */}
              <div className="bg-white/30 dark:bg-blue-900/30 backdrop-blur-xs rounded-2xl p-6 border border-zinc-200/20 dark:border-zinc-700/20">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Allowed Users ({allowedUsers.length})
                </h3>
                
                <div className="space-y-3">
                  {allowedUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-zinc-700 rounded-lg border border-zinc-200 dark:border-zinc-600">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2"/>
                          </svg>
                        </div>
                        <span className="font-mono text-sm text-zinc-900 dark:text-zinc-100">{user}</span>
                      </div>
                      <button className="text-red-500 hover:text-red-700 transition-colors p-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}