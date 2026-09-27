"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Edit3,
  FolderKanban,
  ListTodo,
  Plus,
  Search,
  Trash2,
  UserRound,
  X,
  Zap,
} from "lucide-react";

type TaskStatus = "Todo" | "In Progress" | "Review" | "Completed";
type Priority = "Low" | "Medium" | "High" | "Urgent";

type Task = {
  id: string;
  title: string;
  description: string;
  project: string;
  projectId: string;
  client: string;
  assignee: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
};

const initialTasks: Task[] = [
  { id: "TSK-1001", title: "Finalize homepage layout", description: "Complete final responsive adjustments.", project: "Northstar Website", projectId: "PRJ-1001", client: "Northstar Digital", assignee: "Cyril Loon", status: "Completed", priority: "High", dueDate: "Oct 04, 2026" },
  { id: "TSK-1002", title: "Connect lead capture form", description: "Connect enquiry form to lead workflow.", project: "Northstar Website", projectId: "PRJ-1001", client: "Northstar Digital", assignee: "Cyril Loon", status: "In Progress", priority: "Urgent", dueDate: "Oct 07, 2026" },
  { id: "TSK-1003", title: "Configure analytics events", description: "Set up conversion events.", project: "Lead Generation System", projectId: "PRJ-1002", client: "Northstar Digital", assignee: "Cyril Loon", status: "Todo", priority: "High", dueDate: "Oct 10, 2026" },
  { id: "TSK-1004", title: "Client review and revisions", description: "Collect feedback and apply approved revisions.", project: "Northstar Website", projectId: "PRJ-1001", client: "Northstar Digital", assignee: "Cyril Loon", status: "Todo", priority: "Medium", dueDate: "Oct 13, 2026" },
  { id: "TSK-1005", title: "Prepare service pages", description: "Build consulting service pages.", project: "Consulting Website", projectId: "PRJ-1003", client: "Carter & Co. Consulting", assignee: "Cyril Loon", status: "Review", priority: "Medium", dueDate: "Oct 02, 2026" },
  { id: "TSK-1006", title: "Mobile navigation QA", description: "Test mobile navigation and CTAs.", project: "Bloom Wellness Website", projectId: "PRJ-1004", client: "Bloom Wellness", assignee: "Cyril Loon", status: "In Progress", priority: "High", dueDate: "Oct 11, 2026" },
  { id: "TSK-1007", title: "Booking workflow planning", description: "Document the booking flow.", project: "Booking System", projectId: "PRJ-1005", client: "Bloom Wellness", assignee: "Cyril Loon", status: "Todo", priority: "Medium", dueDate: "Oct 15, 2026" },
  { id: "TSK-1008", title: "Product catalog structure", description: "Prepare product categories and data.", project: "Vertex Eats Store", projectId: "PRJ-1007", client: "Vertex Eats", assignee: "Cyril Loon", status: "In Progress", priority: "High", dueDate: "Oct 09, 2026" },
];

const statuses: TaskStatus[] = ["Todo", "In Progress", "Review", "Completed"];
const priorities: Priority[] = ["Low", "Medium", "High", "Urgent"];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [project, setProject] = useState("All");
  const [modal, setModal] = useState<"add" | "edit" | "delete" | null>(null);
  const [selected, setSelected] = useState<Task | null>(null);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState<Task>({
    id: "", title: "", description: "", project: "Northstar Website",
    projectId: "PRJ-1001", client: "Northstar Digital", assignee: "Cyril Loon",
    status: "Todo", priority: "Medium", dueDate: "Oct 20, 2026",
  });

  const projects = [...new Set(tasks.map(t => t.project))];

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return tasks.filter(t =>
      (!q || [t.title, t.description, t.project, t.client].some(v => v.toLowerCase().includes(q))) &&
      (status === "All" || t.status === status) &&
      (priority === "All" || t.priority === priority) &&
      (project === "All" || t.project === project)
    );
  }, [tasks, search, status, priority, project]);

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === "Todo").length,
    progress: tasks.filter(t => t.status === "In Progress").length,
    review: tasks.filter(t => t.status === "Review").length,
    completed: tasks.filter(t => t.status === "Completed").length,
    urgent: tasks.filter(t => t.priority === "Urgent" && t.status !== "Completed").length,
  };

  const notify = (text: string) => {
    setToast(text);
    window.setTimeout(() => setToast(""), 2400);
  };

  const addTask = () => {
    if (!form.title.trim()) return;
    setTasks(items => [...items, { ...form, id: `TSK-${Date.now()}` }]);
    setModal(null);
    notify("Task added successfully.");
  };

  const saveTask = () => {
    setTasks(items => items.map(t => t.id === form.id ? form : t));
    setModal(null);
    notify("Task updated successfully.");
  };

  const deleteTask = () => {
    if (!selected) return;
    setTasks(items => items.filter(t => t.id !== selected.id));
    setSelected(null);
    setModal(null);
    notify("Task deleted successfully.");
  };

  const toggle = (task: Task) => {
    setTasks(items => items.map(t => t.id === task.id
      ? { ...t, status: t.status === "Completed" ? "Todo" : "Completed" }
      : t));
    notify(task.status === "Completed" ? "Task reopened." : "Task completed.");
  };

  const openAdd = () => {
    setForm({
      id: "", title: "", description: "", project: projects[0] ?? "Northstar Website",
      projectId: "PRJ-1001", client: "Northstar Digital", assignee: "Cyril Loon",
      status: "Todo", priority: "Medium", dueDate: "Oct 20, 2026",
    });
    setModal("add");
  };

  return (
    <main className="min-h-screen w-full bg-[#060914] px-5 py-8 text-white sm:px-8 sm:py-10 xl:px-10">
      <div className="w-full space-y-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ListTodo size={14} className="text-cyan-400" /> Workspace / Tasks
            </div>
            <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Tasks</h1>
            <p className="mt-1 text-sm text-slate-400">Manage delivery work across clients and projects.</p>
          </div>
          <button onClick={openAdd} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2.5 text-sm font-semibold text-slate-950">
            <Plus size={17} /> Add Task
          </button>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <Stat label="Total Tasks" value={stats.total} icon={<ListTodo size={19} />} color="text-cyan-300 bg-cyan-400/10" />
          <Stat label="To Do" value={stats.todo} icon={<Clock3Icon />} color="text-slate-300 bg-white/5" />
          <Stat label="In Progress" value={stats.progress} icon={<Zap size={19} />} color="text-blue-300 bg-blue-400/10" />
          <Stat label="Review" value={stats.review} icon={<Edit3 size={19} />} color="text-violet-300 bg-violet-400/10" />
          <Stat label="Completed" value={stats.completed} icon={<CheckCircle2 size={19} />} color="text-emerald-300 bg-emerald-400/10" />
          <Stat label="Urgent" value={stats.urgent} icon={<AlertCircle size={19} />} color="text-rose-300 bg-rose-400/10" />
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#0b1020] p-4">
          <div className="grid gap-3 xl:grid-cols-[1fr_repeat(3,180px)_auto]">
            <div className="relative">
              <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks, projects, clients..." className="w-full rounded-xl border border-white/10 bg-[#060914] py-2.5 pl-10 pr-3 text-sm outline-none placeholder:text-slate-600 focus:border-cyan-400/40" />
            </div>
            <Select value={status} onChange={setStatus} options={["All", ...statuses]} label="Status" />
            <Select value={priority} onChange={setPriority} options={["All", ...priorities]} label="Priority" />
            <Select value={project} onChange={setProject} options={["All", ...projects]} label="Project" />
            <button onClick={() => { setSearch(""); setStatus("All"); setPriority("All"); setProject("All"); }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-400 hover:bg-white/10 hover:text-white">Clear</button>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="font-semibold">Task Directory</h2>
            <p className="mt-1 text-xs text-slate-500">Showing {filtered.length} of {tasks.length} tasks</p>
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-white/[0.025] text-[10px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Task</th><th className="px-5 py-3">Project</th><th className="px-5 py-3">Assignee</th><th className="px-5 py-3">Priority</th><th className="px-5 py-3">Due</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(task => (
                  <tr key={task.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <div className="flex gap-3">
                        <button onClick={() => toggle(task)} className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${task.status === "Completed" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" : "border-white/10 text-slate-600 hover:text-cyan-300"}`}>{task.status === "Completed" && <Check size={15} />}</button>
                        <div><p className={`text-sm font-medium ${task.status === "Completed" ? "text-slate-500 line-through" : ""}`}>{task.title}</p><p className="mt-1 max-w-[330px] truncate text-xs text-slate-600">{task.id} · {task.description}</p></div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Link href={`/admin/projects/${task.projectId}`} className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-300"><FolderKanban size={15} className="text-violet-300" />{task.project}</Link>
                      <p className="mt-1 text-xs text-slate-600">{task.client}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-300"><span className="inline-flex items-center gap-2"><UserRound size={14} className="text-slate-600" />{task.assignee}</span></td>
                    <td className="px-5 py-4"><span className={`rounded-full border px-2.5 py-1 text-xs ${priorityClass(task.priority)}`}>{task.priority}</span></td>
                    <td className="px-5 py-4 text-sm text-slate-400"><span className="inline-flex items-center gap-2"><CalendarDays size={14} className="text-slate-600" />{task.dueDate}</span></td>
                    <td className="px-5 py-4"><span className={`rounded-full border px-2.5 py-1 text-xs ${statusClass(task.status)}`}>{task.status}</span></td>
                    <td className="px-5 py-4"><div className="flex justify-end gap-1"><button onClick={() => { setForm(task); setModal("edit"); }} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-cyan-400/10 hover:text-cyan-300"><Edit3 size={15} /></button><button onClick={() => { setSelected(task); setModal("delete"); }} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-rose-400/10 hover:text-rose-300"><Trash2 size={15} /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-white/5 lg:hidden">
            {filtered.map(task => (
              <div key={task.id} className="p-4">
                <div className="flex gap-3">
                  <button onClick={() => toggle(task)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-slate-500">{task.status === "Completed" && <Check className="text-emerald-300" size={15} />}</button>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3"><p className="text-sm font-medium">{task.title}</p><button onClick={() => { setForm(task); setModal("edit"); }}><Edit3 size={16} className="text-slate-500" /></button></div>
                    <p className="mt-1 text-xs text-slate-600">{task.project} · {task.dueDate}</p>
                    <div className="mt-3 flex gap-2"><span className={`rounded-full border px-2.5 py-1 text-xs ${priorityClass(task.priority)}`}>{task.priority}</span><span className={`rounded-full border px-2.5 py-1 text-xs ${statusClass(task.status)}`}>{task.status}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!filtered.length && <div className="p-12 text-center text-sm text-slate-500">No tasks found.</div>}
        </section>

        <p className="text-xs text-slate-600">Fictional demo task data. Connect Supabase when this module moves to production.</p>
      </div>

      {toast && <div className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-[#0b1020] px-4 py-3 text-sm text-emerald-300 shadow-2xl"><CheckCircle2 size={16} />{toast}</div>}

      {modal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0b1020] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><h2 className="font-semibold">{modal === "add" ? "Add Task" : modal === "edit" ? "Edit Task" : "Delete Task"}</h2><button onClick={() => setModal(null)}><X size={18} className="text-slate-500" /></button></div>
            <div className="p-5">
              {modal === "delete" ? (
                <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 p-4"><Trash2 size={20} className="text-rose-300" /><p className="mt-3 text-sm font-medium">Delete {selected?.title}?</p><p className="mt-1 text-sm text-slate-400">This removes the fictional demo task.</p></div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Task Title" value={form.title} onChange={v => setForm({ ...form, title: v })} />
                  <Input label="Assignee" value={form.assignee} onChange={v => setForm({ ...form, assignee: v })} />
                  <Select label="Status" value={form.status} options={statuses} onChange={v => setForm({ ...form, status: v as TaskStatus })} />
                  <Select label="Priority" value={form.priority} options={priorities} onChange={v => setForm({ ...form, priority: v as Priority })} />
                  <Input label="Project" value={form.project} onChange={v => setForm({ ...form, project: v })} />
                  <Input label="Due Date" value={form.dueDate} onChange={v => setForm({ ...form, dueDate: v })} />
                  <div className="sm:col-span-2"><label className="text-xs text-slate-400">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-2 min-h-28 w-full rounded-xl border border-white/10 bg-[#060914] p-3 text-sm outline-none focus:border-cyan-400/40" /></div>
                </div>
              )}
              <div className="mt-6 flex justify-end gap-2"><button onClick={() => setModal(null)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300">Cancel</button><button onClick={modal === "delete" ? deleteTask : modal === "edit" ? saveTask : addTask} className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${modal === "delete" ? "bg-rose-500 text-white" : "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950"}`}>{modal === "delete" ? "Delete Task" : modal === "edit" ? "Save Changes" : "Add Task"}</button></div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Stat({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  return <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-5"><div className="flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p></div><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>{icon}</div></div></div>;
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return <div className="relative"><select aria-label={label} value={value} onChange={e => onChange(e.target.value)} className="w-full appearance-none rounded-xl border border-white/10 bg-[#060914] px-3 py-2.5 pr-8 text-sm text-slate-300 outline-none focus:border-cyan-400/40">{options.map(o => <option key={o}>{o}</option>)}</select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600" /></div>;
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return <div><label className="text-xs text-slate-400">{label}</label><input value={value} onChange={e => onChange(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#060914] p-3 text-sm text-white outline-none focus:border-cyan-400/40" /></div>;
}

function priorityClass(priority: Priority) {
  return priority === "Urgent" ? "border-rose-400/20 bg-rose-400/10 text-rose-300" : priority === "High" ? "border-orange-400/20 bg-orange-400/10 text-orange-300" : priority === "Medium" ? "border-blue-400/20 bg-blue-400/10 text-blue-300" : "border-white/10 bg-white/5 text-slate-400";
}

function statusClass(status: TaskStatus) {
  return status === "Completed" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" : status === "In Progress" ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300" : status === "Review" ? "border-violet-400/20 bg-violet-400/10 text-violet-300" : "border-white/10 bg-white/5 text-slate-300";
}

function Clock3Icon() {
  return <CalendarDays size={19} />;
}
