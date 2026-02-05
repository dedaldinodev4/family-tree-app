

export default function About() {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">About the Project</h1>

      <p>
        This project is a Family Tree Manager built with modern
        React technologies.
      </p>

      <ul className="list-disc pl-6">
        <li>Visual family tree using D3 & React Flow</li>
        <li>Local-first data using LocalStorage</li>
        <li>Modern form handling with React Hook Form + Zod</li>
        <li>Theme toggle and responsive UI</li>
      </ul>

      <p>
        The goal is to provide a simple and visual way to
        manage family relationships.
      </p>

      <p>
        Developed by <strong>Dedaldino Daniel</strong>
      </p>
    </div>
  );
}
