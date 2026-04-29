import { connection } from "next/server";
import { RscRevalidateAck } from "./rsc-revalidate-ack";

export default async function RscRevalidateAckServer() {
  await connection();
  // Per-request epoch so client useEffect re-runs after RSC revalidation (not render-purity-critical here).
  // eslint-disable-next-line react-hooks/purity -- intentional request-scoped token for useEffect deps
  const epoch = Date.now();
  return <RscRevalidateAck epoch={epoch} />;
}
