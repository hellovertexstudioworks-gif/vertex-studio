import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ShowcaseHeader() {
  return (
    <div className="relative z-10 mt-[76px] border-b border-slate-200 bg-slate-50">
      <div className="mx-auto flex min-h-[68px] max-w-7xl items-center justify-between gap-6 px-6">

        {/* Back to Vertex */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-white hover:text-blue-600"
        >
          <ArrowLeft
            size={17}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />

          Back to Vertex Studio
        </Link>

        {/* Project Label */}
        <div className="hidden items-center gap-3 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Portfolio Project
          </span>
        </div>

        {/* Project Name */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-bold text-slate-900">
              BrightSmile Dental
            </p>

            <p className="text-xs text-slate-500">
              Website Concept
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-white text-lg shadow-sm">
            🦷
          </div>
        </div>

      </div>
    </div>
  );
}