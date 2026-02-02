import type { Member } from "../family.schema";

export function MemberCard({ member }: { member: Member }) {
  return (
    <div className="border rounded-xl p-3 shadow-sm bg-white">
      <p className="font-semibold">{member.name}</p>
      <p className="text-sm text-gray-500">{member.phone}</p>
    </div>
  );
}
