import { use } from "react";
import EditCelebration from "./EditCelebration";  // import client component

export default function Page({ params }) {
  const { id } = use(params);  // ✅ unwrap params Promise
  return <EditCelebration id={id} />;  // ✅ pass plain id
}
