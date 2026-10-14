export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="wrap flex flex-col gap-2 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>© 2026 Varun Prasad</p>
        <p className="flex gap-5">
          <a href="https://www.linkedin.com/in/varun-design/" target="_blank" rel="noopener">LinkedIn</a>
          <a href="/Varun_Prasad_Resume.pdf" target="_blank" rel="noopener">Resume</a>
        </p>
      </div>
    </footer>
  );
}
