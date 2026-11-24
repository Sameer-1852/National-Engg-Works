import React, { useState, useMemo } from "react";
import {
  ShieldCheck,
  UserPlus,
  Trash2,
  KeyRound,
  Eye,
  EyeOff,
  Search,
  CheckCircle2,
  AlertTriangle,
  Mail,
  User,
  Lock,
  X,
  Shield,
  UserCog,
  Info,
} from "lucide-react";

const AdminUsersPage = ({
  allUsers,
  currentUser,
  onAddUser,
  onRoleChange,
  onDeleteUser,
  showToast,
  onRefreshUsers,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [showPasswords, setShowPasswords] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New User Form State
  const [newUserForm, setNewUserForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
    phone: "",
  });

  const isAuthor = (currentUser?.role || "").toLowerCase() === "author";

  const togglePasswordVisibility = (userId) => {
    setShowPasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const filteredUsers = useMemo(() => {
    return allUsers.filter((u) => {
      if (roleFilter !== "All" && (u.role || "").toLowerCase() !== roleFilter.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          (u.name || "").toLowerCase().includes(q) ||
          (u.email || "").toLowerCase().includes(q) ||
          (u.role || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allUsers, roleFilter, searchQuery]);

  const handleOpenAddModal = (defaultRole = "Admin") => {
    if (!isAuthor) {
      showToast("Access Denied: Only an Author can add new users.", "error");
      return;
    }
    setNewUserForm({
      name: "",
      email: "",
      password: "",
      role: defaultRole,
      phone: "",
    });
    setIsAddModalOpen(true);
  };

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthor) {
      showToast("Access Denied: Only an Author can add new users.", "error");
      return;
    }

    if (!newUserForm.name.trim() || !newUserForm.email.trim() || !newUserForm.password.trim()) {
      showToast("Please enter Full Name, Gmail/Email, and Password.", "error");
      return;
    }

    // Check duplicate email
    const duplicate = allUsers.some(
      (u) => (u.email || "").toLowerCase() === newUserForm.email.trim().toLowerCase()
    );
    if (duplicate) {
      showToast("A user with this Gmail/Email already exists.", "error");
      return;
    }

    const success = await onAddUser({
      name: newUserForm.name.trim(),
      email: newUserForm.email.trim().toLowerCase(),
      password: newUserForm.password.trim(),
      role: newUserForm.role,
      phone: newUserForm.phone.trim(),
    });

    if (success) {
      setIsAddModalOpen(false);
    }
  };

  const handleRoleSelectChange = (user, newRole) => {
    if (!isAuthor) {
      showToast("Access Denied: Only Author can change user roles.", "error");
      return;
    }
    const currentId = currentUser?._id || currentUser?.id;
    const userId = user._id || user.id;
    if (userId === currentId || user.email === currentUser?.email) {
      showToast("You cannot change your own active Author role.", "error");
      return;
    }
    onRoleChange(userId, newRole);
  };

  const handleDeleteClick = (user) => {
    if (!isAuthor) {
      showToast("Access Denied: Only Author can delete admin users.", "error");
      return;
    }
    const currentId = currentUser?._id || currentUser?.id;
    const userId = user._id || user.id;
    if (userId === currentId || user.email === currentUser?.email) {
      showToast("You cannot delete your own currently logged-in account.", "error");
      return;
    }
    if (window.confirm(`Are you sure you want to delete ${user.role} "${user.name}" (${user.email}) from MongoDB?`)) {
      onDeleteUser(userId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Permissions Matrix & Role Info Banner */}
      <div className="bg-gradient-to-r from-[#0d1829] via-[#111e33] to-[#1e293b] rounded-2xl p-6 text-white border border-slate-700/80 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10.5px] font-mono-tech font-bold uppercase tracking-wider bg-amber-500/20 text-[#f59e0b] border border-amber-500/40">
                AUTHOR CONTROL CENTER
              </span>
              <span className="text-xs font-mono-tech text-slate-400">
                Role-Based Access Control (RBAC)
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white">
              Admin &amp; Author User Governance
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Showcasing all system administrative credentials (Name, Gmail, and Passwords) with role-based enforcement.
            </p>
          </div>

          {/* Action Buttons for Author */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleOpenAddModal("Admin")}
              disabled={!isAuthor}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold uppercase transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add New Admin</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenAddModal("Author")}
              disabled={!isAuthor}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold uppercase transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Shield className="w-4 h-4" />
              <span>Add New Author</span>
            </button>
          </div>
        </div>


        {/* Notice for current role */}
        <div className="mt-4 flex items-center gap-2 text-xs bg-slate-800/80 px-3.5 py-2 rounded-lg">
          <Info className="w-4 h-4 text-[#f59e0b] shrink-0" />
          <span>
            You are currently logged in as: <strong className="text-white">{currentUser?.name}</strong> (
            <span className={isAuthor ? "text-purple-300 font-bold" : "text-amber-400 font-bold"}>
              {currentUser?.role || "Admin"}
            </span>
            ). {isAuthor ? "Full Author permissions are ACTIVE." : "Author-only actions are locked for Admin."}
          </span>
        </div>
      </div>

      {/* Search & Role Filters Bar */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Name, Gmail or Role..."
            className="w-full h-10 pl-9 pr-4 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs text-[#0f172a] focus:outline-none focus:border-[#d97706]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {["All", "Admin", "Author"].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setRoleFilter(role)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-tech font-bold transition-colors cursor-pointer ${roleFilter === role
                ? "bg-[#0d1829] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
            >
              {role.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Admin Users Table showing Name, Gmail, Password */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-[10px] font-mono-tech text-[#d97706] uppercase font-bold">
              USER CREDENTIALS DIRECTORY (MONGODB)
            </div>
            <h3 className="text-base font-extrabold text-[#0f172a]">
              All System Administrators ({filteredUsers.length})
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {/* {onRefreshUsers && (
              <button
                type="button"
                onClick={onRefreshUsers}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono-tech text-[11px] font-bold transition-colors cursor-pointer"
                title="Refresh users from MongoDB"
              >
                <span>↻ Refresh MongoDB</span>
              </button>
            )} */}
            <span className="text-xs font-mono-tech text-slate-500">
              Showing Name, Gmail &amp; Password
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#0d1829] text-white font-mono-tech text-[10.5px] uppercase">
                <th className="py-3.5 px-4">#</th>
                <th className="py-3.5 px-4">NAME</th>
                <th className="py-3.5 px-4">GMAIL / EMAIL</th>
                <th className="py-3.5 px-4">PASSWORD</th>
                <th className="py-3.5 px-4">ROLE (PERMISSIONS)</th>
                <th className="py-3.5 px-4">DATE ADDED</th>
                <th className="py-3.5 px-4 text-right">AUTHOR ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-mono-tech">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <ShieldCheck className="w-8 h-8 text-slate-300" />
                      <span className="text-sm font-semibold text-slate-700">
                        No admin users found in MongoDB database
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {searchQuery || roleFilter !== "All"
                          ? "No users match the current filter or search criteria."
                          : "Only users registered in MongoDB are displayed. Click 'Add New Admin' or 'Add New Author' above to add users."}
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, idx) => {
                  const userIsAuthor = (user.role || "").toLowerCase() === "author";
                  const uid = user._id || user.id;
                  const isCurrent =
                    uid === (currentUser?._id || currentUser?.id) ||
                    user.email === currentUser?.email;
                  const isPasswordRevealed = Boolean(showPasswords[uid]);

                  return (
                    <tr key={uid || user.email} className="hover:bg-slate-50 transition-colors">
                      {/* Index */}
                      <td className="py-4 px-4 font-mono-tech font-bold text-slate-400">
                        {String(idx + 1).padStart(2, "0")}
                      </td>

                      {/* Name */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-xs shrink-0 ${userIsAuthor
                              ? "bg-purple-100 text-purple-800 border border-purple-300"
                              : "bg-amber-100 text-amber-800 border border-amber-300"
                              }`}
                          >
                            {(user.name || "A").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-extrabold text-[#0f172a] text-sm flex items-center gap-1.5">
                              <span>{user.name}</span>
                              {isCurrent && (
                                <span className="bg-emerald-100 text-emerald-800 text-[9.5px] font-mono-tech px-1.5 py-0.2 rounded font-bold">
                                  YOU
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono-tech">
                              {user.phone || "NEW Industrial Portal"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Gmail / Email */}
                      <td className="py-4 px-4">
                        <a
                          href={`mailto:${user.email}`}
                          className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-blue-700 hover:text-[#d97706] bg-blue-50/70 px-2.5 py-1 rounded border border-blue-200/70"
                        >
                          <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{user.email}</span>
                        </a>
                      </td>

                      {/* Password (Visible or toggle reveal) */}
                      <td className="py-4 px-4">
                        <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 font-mono-tech">
                          <KeyRound className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="font-bold text-slate-900 tracking-wider">
                            {isPasswordRevealed ? user.password : "••••••••••••"}
                          </span>
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(uid)}
                            className="ml-1 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                            title={isPasswordRevealed ? "Hide Password" : "Show Password"}
                          >
                            {isPasswordRevealed ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Role & Role Change Dropdown */}
                      <td className="py-4 px-4">
                        {isAuthor ? (
                          <div className="inline-flex items-center gap-1.5">
                            <select
                              value={user.role || "Admin"}
                              disabled={isCurrent}
                              onChange={(e) => handleRoleSelectChange(user, e.target.value)}
                              className={`px-2.5 py-1 rounded text-xs font-mono-tech font-bold border focus:outline-none cursor-pointer ${userIsAuthor
                                ? "bg-purple-50 text-purple-800 border-purple-300"
                                : "bg-amber-50 text-amber-800 border-amber-300"
                                } ${isCurrent ? "opacity-70 cursor-not-allowed" : ""}`}
                            >
                              <option value="Admin">Admin (Operations)</option>
                              <option value="Author">Author (Super User)</option>
                            </select>
                          </div>
                        ) : (
                          <span
                            className={`px-2.5 py-1 rounded text-xs font-mono-tech font-bold border ${userIsAuthor
                              ? "bg-purple-100 text-purple-800 border-purple-300"
                              : "bg-amber-100 text-amber-800 border-amber-300"
                              }`}
                          >
                            {user.role}
                          </span>
                        )}
                      </td>

                      {/* Date Added */}
                      <td className="py-4 px-4 font-mono-tech text-[11px] text-slate-500">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "Active"}
                      </td>

                      {/* Author Actions (Delete User) */}
                      <td className="py-4 px-4 text-right">
                        {isAuthor ? (
                          <button
                            type="button"
                            disabled={isCurrent}
                            onClick={() => handleDeleteClick(user)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            title={isCurrent ? "Cannot delete your own active account" : "Delete Admin User"}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        ) : (
                          <span className="text-[11px] font-mono-tech text-slate-400 italic">
                            Author Protected
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                }))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD NEW ADMIN USER / AUTHOR */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#0d1829] text-white px-7 py-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono-tech text-[#f59e0b] uppercase font-bold">
                  AUTHOR PRIVILEGED ACTION
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  Create New {newUserForm.role} User
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateUserSubmit} className="p-7 space-y-4">
              {/* Field 1: Full Name */}
              <div>
                <label className="block text-xs font-bold font-mono-tech uppercase text-slate-800 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={newUserForm.name}
                    onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs text-[#0f172a] focus:outline-none focus:border-[#d97706]"
                  />
                </div>
              </div>

              {/* Field 2: Gmail / Email */}
              <div>
                <label className="block text-xs font-bold font-mono-tech uppercase text-slate-800 mb-1">
                  Gmail / Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    placeholder="e.g. ramesh.patel@gmail.com"
                    className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs text-[#0f172a] focus:outline-none focus:border-[#d97706]"
                  />
                </div>
              </div>

              {/* Field 3: Password */}
              <div>
                <label className="block text-xs font-bold font-mono-tech uppercase text-slate-800 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={newUserForm.password}
                    onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                    placeholder="e.g. Admin@2026"
                    className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs font-mono-tech text-[#0f172a] focus:outline-none focus:border-[#d97706]"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  This password will be visible to Authors on the Admin Users page as requested.
                </p>
              </div>

              {/* Field 4: Role Assignment */}
              <div>
                <label className="block text-xs font-bold font-mono-tech uppercase text-slate-800 mb-1">
                  Assign Role &amp; Permissions <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <label
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${newUserForm.role === "Admin"
                      ? "bg-amber-50 border-[#d97706] text-amber-900"
                      : "bg-[#f8fafc] border-slate-200 text-slate-700"
                      }`}
                  >
                    <input
                      type="radio"
                      name="roleOption"
                      value="Admin"
                      checked={newUserForm.role === "Admin"}
                      onChange={() => setNewUserForm({ ...newUserForm, role: "Admin" })}
                      className="accent-[#d97706]"
                    />
                    <div>
                      <div className="text-xs font-bold">Admin</div>
                      <div className="text-[10px] text-slate-500">Products &amp; Operations</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${newUserForm.role === "Author"
                      ? "bg-purple-50 border-purple-600 text-purple-900"
                      : "bg-[#f8fafc] border-slate-200 text-slate-700"
                      }`}
                  >
                    <input
                      type="radio"
                      name="roleOption"
                      value="Author"
                      checked={newUserForm.role === "Author"}
                      onChange={() => setNewUserForm({ ...newUserForm, role: "Author" })}
                      className="accent-purple-700"
                    />
                    <div>
                      <div className="text-xs font-bold">Author</div>
                      <div className="text-[10px] text-slate-500">User Management &amp; Super</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold uppercase shadow-sm transition-colors cursor-pointer"
                >
                  Create {newUserForm.role} User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
