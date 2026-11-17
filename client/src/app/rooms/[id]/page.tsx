import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ROOMS } from "@/data/rooms";
import { RoomView } from "@/components/RoomView";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return ROOMS.map((room) => ({ id: room.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const room = ROOMS.find((item) => item.id === id);
  if (!room) return { title: "Room — Driftwood Stays" };
  return {
    title: `${room.title} — Driftwood Stays`,
    description: room.description,
  };
}

export default async function RoomPage({ params }: Props) {
  const { id } = await params;
  const room = ROOMS.find((item) => item.id === id);
  if (!room) notFound();
  return <RoomView room={room} />;
}
