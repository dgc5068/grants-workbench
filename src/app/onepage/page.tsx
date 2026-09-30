import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Grant Clark — Visual Resume",
  description:
    "One-page visual summary of Grant Clark's engineering experience: competition rocketry, autonomous aircraft tug, and robotics instruction.",
};

const LIGHT = "bg-white text-zinc-900";
const HAIRLINE = "border-zinc-200";
const MUTED = "text-zinc-500";
const LABEL = `font-mono text-[10px] uppercase tracking-[0.25em] ${MUTED}`;

export default function OnePage() {
  return (
    <div className={`${LIGHT} py-10`}>
      {/* 8.5:11 letter ratio — screenshot fills a printed page */}
      <div className="mx-auto w-full max-w-204 px-5">
        <div
          className={`flex aspect-8.5/11 flex-col justify-between border ${HAIRLINE} p-7`}
        >
          {/* Header */}
          <header className={`border-b ${HAIRLINE} pb-4`}>
            <Image
              src="/grant-clark-engineering-cropped.png"
              alt="Grant Clark — Mechanical/Electrical Engineering"
              width={3369}
              height={234}
              priority
              className="h-auto w-full max-w-md"
            />
          </header>

          {/* Rocketry */}
          <section
            className={`flex items-center gap-5 border-b ${HAIRLINE} py-5`}
          >
            <div className="min-w-0 flex-1">
              <p className={LABEL}>FAR OUT Rocketry Competition</p>
              <h2 className="mt-1.5 text-lg font-semibold leading-tight">
                Flight computer for a 12-ft liquid rocket
              </h2>
              <ul className="mt-2.5 list-disc space-y-1 pl-4 text-[13px] leading-5.5 text-zinc-700">
                <li>
                  Telemetry and data transmission from a vehicle in flight at up
                  to 10,000 ft while managing packet loss
                </li>
                <li>1080p/30fps live video downlink from the rocket</li>
                <li>
                  Payload ejection mechanism deploying a parachute cartridge at
                  apogee
                </li>
              </ul>
            </div>
            <Image
              src="/images/onepage/avionics-bay.png"
              alt="CAD model of the rocket's avionics bay"
              width={336}
              height={554}
              className={`w-32 shrink-0 border ${HAIRLINE} object-contain p-1.5`}
            />
          </section>

          {/* E-Tug */}
          <section className={`border-b ${HAIRLINE} py-5`}>
            <p className={LABEL}>UVU Engineering Research</p>
            <h2 className="mt-1.5 text-lg font-semibold leading-tight">
              Autonomous electric aircraft tug
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Image
                src="/images/etug-intro/tug-front.jpg"
                alt="Aircraft tug, front view, mid-teardown on a pallet"
                width={1600}
                height={900}
                className={`aspect-video w-full border ${HAIRLINE} object-cover`}
              />
              <Image
                src="/images/etug-intro/tug-back.jpg"
                alt="Aircraft tug, rear view, wiring harness exposed"
                width={1600}
                height={900}
                className={`aspect-video w-full border ${HAIRLINE} object-cover`}
              />
            </div>
            <ul className="mt-2.5 list-disc space-y-1 pl-4 text-[13px] leading-5.5 text-zinc-700">
              <li>
                LiDAR integration lead on a multidisciplinary team upgrading a
                prototype remote-controlled f-22 tug to full autonomy
              </li>
              <li>
                Sensor mounting, data pipeline, and mechanical/electrical
                integration. Working prototype targeted by spring
              </li>
            </ul>
          </section>

          {/* IDW */}
          <section className="pt-5">
            <p className={LABEL}>Idaho Discovery Week — Boise, ID</p>
            <h2 className="mt-1.5 text-lg font-semibold leading-tight">
              Robotics engineering lead instructor
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Image
                src="/images/teaching-robotics-engineering/grant-mo-idw-shirts.jpg"
                alt="Grant teaching at Idaho Discovery Week"
                width={3190}
                height={1905}
                className={`aspect-video w-full border ${HAIRLINE} object-cover`}
              />
              <Image
                src="/images/teaching-robotics-engineering/some-boards.jpeg"
                alt="Student Arduino project boards"
                width={2040}
                height={1536}
                className={`aspect-video w-full border ${HAIRLINE} object-cover`}
              />
            </div>
            <ul className="mt-2.5 list-disc space-y-1 pl-4 text-[13px] leading-5.5 text-zinc-700">
              <li>
                Co-founded a summer learning camp. Designed and taught an
                Arduino-based electronics curriculum to 100+ students
              </li>
              <li>
                Built the project sequence from physics fundamentals through
                take-home builds
              </li>
            </ul>
          </section>

          <p className={`text-center ${LABEL}`}>
            Full write-ups and project photos at grantsworkbench.com
          </p>
        </div>
      </div>
    </div>
  );
}
