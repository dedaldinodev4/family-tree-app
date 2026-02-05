import { Link } from "@tanstack/react-router";
import { useMembers } from "../family.hooks";

export function MemberGallery () {
  const { data: members = [] } = useMembers();

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
      {members
        .filter(m => m.photo)
        .map(m => (
          <Link key={m.id} to={`/members/${m.id}`}>
            <div className="rounded-lg overflow-hidden border">
              <img
                src={m.photo}
                alt={m.name}
                className="aspect-square object-cover"
              />
              <p className="p-2 text-center text-sm font-medium">
                {m.name}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
