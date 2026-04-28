import { connection } from "next/server";
import { RscRevalidateAck } from "./rsc-revalidate-ack";

export default async function RscRevalidateAckServer() {
  await connection();
  return <RscRevalidateAck epoch={Date.now()} />;
}
