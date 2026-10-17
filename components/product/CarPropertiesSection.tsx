"use client";
import { Check, Car, User } from "lucide-react";
import React, { useState } from "react";
import { VehicleResponse } from "../../lib/api/vehicle.service";
import { getAssetUrl } from "../../lib/asset-url";
import { BookingCalculateResponse } from "../../lib/api/booking.service";

// ── Props ─────────────────────────────────────────────────────────────────────
interface CarPropertiesSectionProps {
  vehicle: VehicleResponse | null;
  activeTab: "properties" | "rental-terms";
  setActiveTab: (tab: "properties" | "rental-terms") => void;
  isChauffeurDriven: boolean;
  setIsChauffeurDriven: (v: boolean) => void;
  hasGps: boolean;
  setHasGps: (v: boolean) => void;
  hasFullInsurance: boolean;
  setHasFullInsurance: (v: boolean) => void;
  hasAdditionalDriver: boolean;
  setHasAdditionalDriver: (v: boolean) => void;
  hasChildSeat: boolean;
  setHasChildSeat: (v: boolean) => void;
  priceBreakdown?: BookingCalculateResponse | null;
  priceLoading?: boolean;
}

const ADDONS = [
  { key: "hasGps" as const, label: "GPS Navigation", hint: "Live turn-by-turn navigation device", priceKey: "gpsCharge" as const },
  { key: "hasFullInsurance" as const, label: "Full Insurance", hint: "Comprehensive collision and theft cover", priceKey: "fullInsuranceCharge" as const },
  { key: "hasAdditionalDriver" as const, label: "Additional Driver", hint: "Add an extra authorised driver", priceKey: "additionalDriverCharge" as const },
  { key: "hasChildSeat" as const, label: "Child Seat", hint: "Compliant safety seat for children", priceKey: "childSeatCharge" as const },
] as const;

type AddonKey = "hasGps" | "hasFullInsurance" | "hasAdditionalDriver" | "hasChildSeat";
// ── Component ─────────────────────────────────────────────────────────────────
const CarPropertiesSection: React.FC<CarPropertiesSectionProps> = ({
  vehicle,
  activeTab,
  setActiveTab,
  isChauffeurDriven,
  setIsChauffeurDriven,
  hasGps,
  setHasGps,
  hasFullInsurance,
  setHasFullInsurance,
  hasAdditionalDriver,
  setHasAdditionalDriver,
  hasChildSeat,
  setHasChildSeat,
  priceBreakdown,
  priceLoading,
}) => {

  const price = vehicle?.pricing?.dailyRate
    ? Number(vehicle.pricing.dailyRate).toLocaleString()
    : "—";
  const name = vehicle?.name ?? "Loading vehicle...";
  const imageUrl = vehicle?.images?.[0]?.path
    ? getAssetUrl(vehicle.images[0].path)
    : "/product/car.png";

  // Map toggle setter by key
  const addonSetters: Record<AddonKey, (v: boolean) => void> = {
    hasGps: setHasGps,
    hasFullInsurance: setHasFullInsurance,
    hasAdditionalDriver: setHasAdditionalDriver,
    hasChildSeat: setHasChildSeat,
  };
  const addonValues: Record<AddonKey, boolean> = {
    hasGps,
    hasFullInsurance,
    hasAdditionalDriver,
    hasChildSeat,
  };

  // Price formatting helper
  const fmt = (n: number) => `Ksh ${n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  return (
    <div className="bg-white">
      <div className="max-w-[1440px] mx-auto p-6 bg-white">
        {/* --- TOP SECTION: VEHICLE HEADER --- */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="w-full md:w-1/3">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="flex-1 pt-4">
            <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-4">{name}</h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-[#777777] mb-6">
              <span>{vehicle?.seatingCapacity ?? "—"} seats</span>
              <span>{vehicle?.luggageCapacity ?? "—"} bags</span>
              <span>{vehicle?.transmission ?? "—"}</span>
              <span>{vehicle?.fuelType ?? "—"}</span>
            </div>
            <span className="inline-block bg-[#FFF4E5] text-[#FF8F00] text-[11px] font-bold px-3 py-1 rounded-[4px] uppercase tracking-wider">
              Instant Booking
            </span>
          </div>
        </div>

        {/* --- BOTTOM SECTION: DETAILS & PRICE --- */}
        <div className="flex flex-col lg:flex-row gap-10 border-t border-[#EEEEEE] pt-8">
          {/* LEFT: PROPERTIES & ADD-ONS */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex mb-10 border-b border-[#43A047]/20">
              <button
                onClick={() => setActiveTab("properties")}
                className={`px-10 py-4 text-[16px] font-semibold rounded-t-[4px] transition-colors ${activeTab === "properties"
                  ? "bg-[#43A047] text-white"
                  : "bg-transparent text-[#43A047] hover:bg-[#43A047]/10"
                  }`}
              >
                Properties Overview
              </button>
              <button
                onClick={() => setActiveTab("rental-terms")}
                className={`px-10 py-4 text-[16px] font-semibold rounded-t-[4px] transition-colors ${activeTab === "rental-terms"
                  ? "bg-[#43A047] text-white"
                  : "bg-transparent text-[#43A047] hover:bg-[#43A047]/10"
                  }`}
              >
                Rental Terms
              </button>
            </div>

            {/* Properties Overview Tab */}
            {activeTab === "properties" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-6 mb-10">
                  {/* Column 1: Policy Info */}
                  <div className="space-y-8">
                    <div className="border-l-[3px] border-[#FF8F00] pl-4">
                      <p className="text-[14px] text-[#777777] mb-2">Fuel policy</p>
                      <p className="text-[18px] font-bold text-[#1A1A1A]">Same to same</p>
                    </div>
                  </div>

                  {/* Column 2: Included Features */}
                  <div className="space-y-5">
                    {vehicle?.features
                      ?.filter((f) => !f.isAddon)
                      .map((feature) => (
                        <FeatureItem key={feature.id} label={feature.name} />
                      ))}
                    {(!vehicle?.features || vehicle.features.filter((f) => !f.isAddon).length === 0) && (
                      <>
                        <FeatureItem label="Unlimited mileage" />
                        <FeatureItem label="Collision Damage Waiver" />
                      </>
                    )}
                  </div>
                </div>

                {/* Add-on Extras */}
                <div>
                  <h3 className="text-[17px] font-bold text-[#1A1A1A] mb-4">Optional Extras</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ADDONS.map(({ key, label, hint, priceKey }) => {
                      const checked = addonValues[key];
                      const addonPrice = vehicle?.pricing ? (vehicle.pricing as any)[priceKey] : null;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => addonSetters[key](!checked)}
                          className={`flex items-start gap-4 p-4 rounded-[10px] border-2 text-left transition-all duration-150 ${checked
                            ? "border-[#43A047] bg-[#F0FAF0]"
                            : "border-[#E5E7EB] bg-white hover:border-[#43A047]/40"
                            }`}
                        >
                          <div
                            className={`mt-0.5 w-5 h-5 rounded-[4px] border-2 flex items-center justify-center shrink-0 transition-colors ${checked ? "border-[#43A047] bg-[#43A047]" : "border-[#D1D5DB]"
                              }`}
                          >
                            {checked && <Check size={12} strokeWidth={3} className="text-white" />}
                          </div>
                          <div>
                            <p className="text-[15px] font-bold text-[#1A1A1A] leading-tight">
                              {label}
                              {addonPrice ? (
                                <span className="text-[#43A047] ml-2 text-[13px]">(+Ksh {Number(addonPrice).toLocaleString()})</span>
                              ) : null}
                            </p>
                            <p className="text-[12px] text-[#777777] mt-0.5">{hint}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                {/* Drive Type Selection */}
                <div className="mt-8">
                  <h3 className="text-[17px] font-bold text-[#1A1A1A] mb-4">Drive Type</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DriveTypeOption
                      icon={<Car size={20} />}
                      label="Self Drive"
                      hint="Drive the vehicle yourself"
                      selected={!isChauffeurDriven}
                      onClick={() => setIsChauffeurDriven(false)}
                    />
                    <DriveTypeOption
                      icon={<User size={20} />}
                      label="Chauffeur Driven"
                      hint="Professional driver provided"
                      selected={isChauffeurDriven}
                      onClick={() => setIsChauffeurDriven(true)}
                      price={vehicle?.pricing?.chauffeurRate ? `+${fmt(Number(vehicle.pricing.chauffeurRate))}/day` : undefined}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Rental Terms Tab */}
            {activeTab === "rental-terms" && (
              <RentalTermsAccordion />
            )}
          </div>

          {/* RIGHT: PRICE CARD */}
          <div className="lg:w-[350px] shrink-0">
            <div className="bg-[#F3F5F6] rounded-[12px] p-8 sticky top-8">
              <h2 className="text-[26px] font-bold text-[#1A1A1A] mb-1 text-center">
                {priceLoading ? (
                  <span className="text-[18px]">Calculating...</span>
                ) : priceBreakdown ? (
                  fmt(Number(priceBreakdown.totalAmount))
                ) : (
                  `Ksh ${price}`
                )}
              </h2>
              <p className="text-[14px] text-[#777777] mb-6 text-center">
                {priceBreakdown ? "Total" : "Per day"}
              </p>

              {/* Detailed Breakdown */}
              {priceBreakdown && (
                <div className="border-t border-[#E0E0E0] pt-5 mb-5 space-y-3">
                  <BreakdownRow label={`Rental (${priceBreakdown.durationDays} day${priceBreakdown.durationDays !== 1 ? "s" : ""})`} value={priceBreakdown.rentalCost} />
                  {priceBreakdown.chauffeurFee > 0 && (
                    <BreakdownRow label="Chauffeur Charge" value={priceBreakdown.chauffeurFee} />
                  )}
                  {priceBreakdown.deliveryFee > 0 && (
                    <BreakdownRow label="Delivery / Collection" value={priceBreakdown.deliveryFee} />
                  )}
                  {priceBreakdown.airportFee > 0 && (
                    <BreakdownRow label="Airport Fee" value={priceBreakdown.airportFee} />
                  )}
                  {priceBreakdown.dropOffFee > 0 && (
                    <BreakdownRow label="Drop-off Fee" value={priceBreakdown.dropOffFee} />
                  )}
                  {priceBreakdown.pickupFee > 0 && (
                    <BreakdownRow label="Pickup Fee" value={priceBreakdown.pickupFee} />
                  )}
                  {priceBreakdown.addonsCost > 0 && (
                    <BreakdownRow label="Add-ons" value={priceBreakdown.addonsCost} />
                  )}
                  <div className="border-t border-[#E0E0E0] pt-3">
                    <BreakdownRow label="Subtotal" value={priceBreakdown.subtotal} bold />
                  </div>
                  <BreakdownRow
                    label={`Tax (${priceBreakdown.taxPercentage}%)`}
                    value={priceBreakdown.taxAmount}
                  />
                  <div className="border-t border-[#E0E0E0] pt-3">
                    <BreakdownRow label="Total" value={priceBreakdown.totalAmount} bold accent />
                  </div>
                </div>
              )}

              {!priceBreakdown && <div className="w-full h-[1px] bg-[#E0E0E0] mb-8" />}

              <div className="text-left">
                <p className="text-[#FF8F00] text-[13px] font-bold uppercase mb-4 tracking-tight">
                  Good Choice
                </p>
                <div className="flex gap-3 items-start">
                  <Check size={18} className="text-[#FF8F00] mt-1 shrink-0" />
                  <p className="text-[14px] text-[#1A1A1A] leading-[1.6]">
                    <span className="font-bold">Instant confirmation</span> — your booking is secured
                    immediately after submission.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const RentalTermsAccordion = () => {
  const [openTerm, setOpenTerm] = useState("driver-licence");
  const toggleTerm = (id: string) => setOpenTerm((current) => (current === id ? "" : id));

  const terms = [
    {
      id: "driver-licence",
      title: "Driver & Licence",
      content: (
        <>
          <p>When you pick the car up, you&apos;ll need:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Passport or national ID card</li>
            <li>Driving licence</li>
            <li>Credit card</li>
          </ul>
          <p>All drivers must be aged between 23 and 70 with at least 5 years&apos; driving experience.</p>
        </>
      ),
    },
    {
      id: "damage-excess",
      title: "Damage Excess",
      content: (
        <>
          <p>If the car&apos;s bodywork gets damaged, you&apos;re covered by the Collision Damage Waiver. This means that the most you&apos;ll pay towards repairs is the damage excess.</p>
          <p>This cover is only valid if you stick to the terms of the rental agreement. It doesn&apos;t cover other parts of the car (e.g. windows, wheels, interior or undercarriage), or charges (e.g. for towing or off-road time), or anything in the car (e.g. child seats, GPS devices or personal belongings).</p>
        </>
      ),
    },
    {
      id: "security-deposit",
      title: "Security Deposit",
      content: (
        <>
          <p>At pick-up, the main driver will leave a refundable security deposit on their credit card. Cash and debit cards are not accepted. The counter staff will confirm how much this will be.</p>
          <p className="font-bold text-[#1A1A1A]">Accepted Cards</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>MasterCard</li>
            <li>Visa</li>
          </ul>
          <p className="font-semibold italic">Note: This company will not accept prepaid, recharge or virtual credit cards — or any card on which the relevant characters are not raised (embossed).</p>
        </>
      ),
    },
    {
      id: "fuel-policy",
      title: "Fuel Policy",
      content: <p>When you pick your car up, the fuel tank will be full or partly full. You will leave a deposit to cover the cost of the fuel: the counter staff will block this money on your credit card. Just before you return your car, please replace the fuel you&apos;ve used.</p>,
    },
    {
      id: "mileage",
      title: "Mileage",
      content: <p>Your rental includes unlimited free kilometres if the rental is above a week. Any rental below 7 days is limited to 200 kms a day and an extra charge is applicable.</p>,
    },
    {
      id: "full-rental-terms",
      title: "Full Rental Terms",
      content: <FullRentalTerms />,
    },
  ];

  return (
    <div className="border-t border-[#E5E7EB] text-[16px] leading-[1.6] text-[#444444]">
      {terms.map(({ id, title, content }) => {
        const isOpen = openTerm === id;
        const headingId = id + "-heading";
        const panelId = id + "-panel";

        return (
          <section key={id} className="border-b border-[#E5E7EB]">
            <h3 id={headingId}>
              <button
                type="button"
                onClick={() => toggleTerm(id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full py-4 text-left text-[16px] font-bold uppercase text-[#1F2937] transition-colors hover:text-[#FF6B14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B14] focus-visible:ring-inset"
              >
                {title}
              </button>
            </h3>
            {isOpen && (
              <div id={panelId} role="region" aria-labelledby={headingId} className="space-y-4 pb-6">
                {content}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

const FullRentalTerms = () => (
  <article className="space-y-6">
    <section className="space-y-3">
      <p className="font-bold text-[#1A1A1A]">Insurance, Covers and Waivers</p>
      <TermsSubheading>Collision Damage Waiver (CDW)</TermsSubheading>
      <p>If the car&apos;s bodywork gets damaged, the most you&apos;ll pay towards repairs covered by the Collision Damage Waiver is the damage excess. This cover is only valid if you stick to the terms of the rental agreement. It doesn&apos;t cover other parts of the car (e.g. glass, wheels, interior, roof or undercarriage), or charges (e.g. towing or off-road time), or anything in the car (e.g. child seats, GPS devices or personal belongings).</p>
      <TermsSubheading>Third-Party Liability (TPL)</TermsSubheading>
      <p>This covers the driver&apos;s liability for injuries and property damage which are covered by the policy. It does not cover injuries to the driver or damage to the rental car. This cover is only valid if you stick to the terms of the rental agreement.</p>
      <TermsSubheading>Theft Protection (TP)</TermsSubheading>
      <p>If the car is stolen, the most you&apos;ll pay towards replacement costs covered by the policy is the theft excess. This cover is only valid if you stick to the terms of the rental agreement.</p>
      <TermsSubheading>Personal Accident Insurance (PAI)</TermsSubheading>
      <p>In the event of an accident, this insurance covers medical and legal costs for injuries which are covered by the policy, including death and loss of limb(s). This cover is only valid if you stick to the terms of the rental agreement.</p>
    </section>

    <section className="space-y-3">
      <TermsSubheading>Included at no extra cost</TermsSubheading>
      <ul className="list-disc space-y-1 pl-6">
        <li>Airport Surcharge</li>
        <li>Emergency Roadside Assistance</li>
        <li>Premium Location Surcharge</li>
      </ul>
      <TermsSubheading>Mileage / Kilometers</TermsSubheading>
      <p>Your rental includes unlimited free kilometers for one week rental and is limited to 200 kms a day for rentals that are less than 7 days. Changing the length of your rental can affect how many kilometers you can drive for free and how much you will pay for each additional kilometer.</p>
    </section>

    <section className="space-y-3">
      <TermsSubheading>Not Included in the Rental Price</TermsSubheading>
      <TermsSubheading>Local Charges</TermsSubheading>
      <p>This section shows charges that you&apos;ll pay at the counter because of where you&apos;re picking your car up, who&apos;s driving, and where you go during your rental. It doesn&apos;t show other over-the-counter costs, such as charges for fuel, child seats or additional services.</p>
      <p>You are responsible for any charges and fines, including tolls, congestion charges, speeding tickets and parking or traffic fines.</p>
      <TermsSubheading>After your rental</TermsSubheading>
      <p>If you&apos;ve incurred any charges, such as speeding tickets or unpaid congestion charges, we will try to contact you when the authorities ask who was driving. This could be months after your rental — and you&apos;ll have to pay the company&apos;s administration fee as well as the original charge.</p>
      <TermsSubheading>One-Way Rentals</TermsSubheading>
      <p>If you arrange to pick the car up in one location and drop it off in another, Unicorn will charge a one-way fee to cover the cost of returning the car to the original location. Prior notification is required for all one-way rentals. If you drop the car off at a location other than the one originally agreed, you will incur a penalty.</p>
      <TermsSubheading>Other Fees</TermsSubheading>
      <p><strong>Valeting Fee:</strong> Unicorn will charge you if the car needs more than a reasonable amount of cleaning after your rental.</p>
    </section>

    <section className="space-y-3">
      <TermsSubheading>What you need at pick-up</TermsSubheading>
      <TermsSubheading>Acceptable forms of payment</TermsSubheading>
      <p>You are required to have a credit card for this booking. The main driver must have a credit card in their own name with enough available funds to cover the excess/deposit amount, local fees, extra equipment and anything purchased at the car hire counter. Cash and debit cards are not accepted.</p>
      <p><strong>Accepted Credit Cards:</strong> MasterCard and Visa.</p>
      <p><strong>Please Note:</strong> This company will not accept prepaid, recharge or virtual credit cards — or any card on which the relevant characters are not raised (embossed). Visa Danker cards and Chinese UnionPay credit cards are not accepted.</p>
      <TermsSubheading>Licence Requirements</TermsSubheading>
      <p>When picking the car up, the main driver and any additional drivers will need to provide a full driving licence in their name. All drivers must have held their driving licence for at least 5 years. Where a national licence has a photocard licence and a secondary paper counterpart licence, both parts are required.</p>
      <TermsSubheading>Forms of Identification</TermsSubheading>
      <p>A passport or identity card is required.</p>
      <TermsSubheading>Rental Voucher / eVoucher</TermsSubheading>
      <p>When you pick your car up, the counter staff will need to see your voucher, which you receive when your booking is confirmed. At pick-up, Unicorn requires either a printed copy of the customer&apos;s voucher or an eVoucher. If this is not presented, we may not allow the car to be picked up or may charge again for the rental.</p>
      <TermsSubheading>Age Requirements</TermsSubheading>
      <p>The minimum age limit for this car is 23 and the maximum age limit is 70. Unicorn&apos;s age-related charges and restrictions apply to all additional drivers.</p>
      <TermsSubheading>Arrival Details</TermsSubheading>
      <p><strong>Flight Details:</strong> If you are arriving by plane, please tell us your flight number so we can pass it on to your driver, ideally at least 3 days before pick-up. We cannot be held responsible if a problem with your flight stops you picking up your car.</p>
    </section>

    <section className="space-y-3">
      <TermsSubheading>Deposits, Excess and Cover</TermsSubheading>
      <TermsSubheading>Deposit / Excess</TermsSubheading>
      <p>Unicorn will require a security deposit of US$ 1,000.00 when you pick your car up. The deposit will be returned after the rental, as long as all conditions have been met. The car has a damage excess ranging between US$ 1,653.00 and US$ 3,500.00 including tax, depending on the vehicle model, and a theft excess of US$ 3,500.00 including tax.</p>
      <p>Due to fluctuating foreign exchange rates and other possible banking charges, Unicorn Rent A Car Limited cannot be held responsible for any difference between the amount paid and the amount refunded.</p>
      <TermsSubheading>Unicorn Rent A Car Limited Cover — Full Protection</TermsSubheading>
      <p>If you purchase Unicorn Rent A Car Limited&apos;s Full Protection waiver product before you pick the car up, we will waive your liability (and refund you) for:</p>
      <ul className="list-disc space-y-1 pl-6">
        <li>damage to the rental car&apos;s exterior or mechanical components, including bodywork, roof, undercarriage, windows, mirrors, wheels, tyres, engine, clutch, battery and locks;</li>
        <li>immobilisation charges while the car is being repaired;</li>
        <li>roadside assistance charges resulting from a breakdown or accident;</li>
        <li>charges for locking yourself out of the rental car or losing its key(s);</li>
        <li>Theft Protection claims and related administration fees.</li>
      </ul>
      <p>Full Protection does not waive liability for repairs, roadside assistance or other services not approved by us; cleaning charges or interior damage unless caused by a collision; or damage to/loss of child seats, GPS devices or other extra equipment.</p>
      <p>All drivers must abide by the rental agreement. Full Protection will not refund costs arising from dangerous, careless or negligent driving, refuelling errors, or driving under the influence of drugs or alcohol. A deposit may still be blocked on your credit card to cover potential damage or loss, subject to these terms.</p>
      <p>If you buy Full Protection, you will receive the policy documentation by email. We cannot issue a refund merely because you do not make a claim.</p>
      <TermsSubheading>Optional Covers and Waivers available at counter</TermsSubheading>
      <p><strong>Super Collision Damage Waiver (SCDW)</strong> reduces the driver&apos;s liability if the rental car is damaged, subject to the rental agreement. The driver is generally responsible only for the excess, which may be set at zero. This protection applies to all authorised drivers.</p>
      <TermsSubheading>Cover Arrangements</TermsSubheading>
      <p>At pick-up, the counter staff may offer additional products in relation to your excess or deposit. Please read the terms of any cover you receive when signing the rental agreement. Policies normally exclude windscreens, glass, wheels, tyres, undercarriage, interior, personal belongings, towing charges, off-road time and hired extra equipment. Cover is invalidated by negligence, refuelling errors or breaking the rental agreement.</p>
      <TermsSubheading>Administration Charges</TermsSubheading>
      <p>Damage will be charged by Unicorn Rent A Car Limited after drop-off and will incur a Damage Administration fee in addition to the amount deducted from the excess. An Immobilisation Charge is payable after an accident and is calculated against the car group and number of repair days.</p>
    </section>

    <section className="space-y-3">
      <TermsSubheading>Fuel Policy Options</TermsSubheading>
      <TermsSubheading>Full to Full</TermsSubheading>
      <p>When you pick your car up, the fuel tank will be full or partly full. You will leave a deposit to cover the fuel cost, which will be blocked on your credit card. Before return, please replace the fuel you&apos;ve used. If you return the car with less fuel, Unicorn may keep some or all of your deposit and charge a non-refundable fuel service charge of US$ 23.20 including tax.</p>
      <TermsSubheading>Extra Services (Payable at Counter)</TermsSubheading>
      <p><strong>Cross-Border and Boundary rules:</strong> Cross-border travel is not allowed at the moment.</p>
      <p><strong>Deliveries and Collections:</strong> If requested in advance, Unicorn may agree to deliver the car at the start of the rental. The cost will be confirmed after booking and catered for when signing the rental agreement.</p>
      <p><strong>Taxes &amp; Fees:</strong> Additional services are subject to applicable sales taxes and location fees.</p>
      <TermsSubheading>Extra Equipment (Payable at Counter)</TermsSubheading>
      <p>Additional extras should be requested at booking and paid for at pick-up. Availability is not guaranteed and prices may change. Additional extras are subject to applicable sales and location taxes, and customers may need to leave a deposit at the counter.</p>
      <TermsSubheading>Additional Drivers</TermsSubheading>
      <p>The cost to add an additional driver is US$ 50.00 including tax, per day. Unicorn&apos;s age-related charges and restrictions apply to all additional drivers.</p>
    </section>

    <section className="space-y-3">
      <TermsSubheading>Important Information</TermsSubheading>
      <p>Please read the Terms &amp; Conditions in full before pick-up. You must take the required documents, including your driving licence, identification and payment card. By making this booking, you confirm that you have read and accept our Terms &amp; Conditions. At pick-up, you will need to sign a rental agreement; please read it carefully and ask about anything that is not clear before signing.</p>
      <p>If you are dissatisfied with any aspect of your rental, discuss it with us at the time. If you need help during your rental, please contact us.</p>
      <p><strong>Information Regarding Exchange Rates and Fees:</strong> We cannot be held responsible for exchange-rate fluctuations or fees charged by your bank or card issuer. The amount on your statement may differ from the amount shown when booking; refunds will be for the amount initially charged.</p>
      <p><strong>Accident or Breakdown:</strong> Call us immediately and report a breakdown, accident or mechanical difficulty to the nearest police station within 48 hours. We must authorise repairs or replacement cars. For accidents, a police report and an incident report from our counter are required.</p>
      <p><strong>Roadside Assistance:</strong> Emergency roadside assistance may be available for an extra charge. <strong>Lost Keys:</strong> replacement keys will be charged. <strong>Seatbelt:</strong> drivers and passengers must wear seatbelts where fitted. All cars are non-smoking; fines apply if this policy is not followed.</p>
      <p><strong>Price Calculation:</strong> prices are based on the agreed pick-up and drop-off times and dates. No refund is given for unused time if you pick up later or return earlier.</p>
      <p>At pick-up, you may choose a different car from the one reserved; an additional premium may apply, even if the replacement is smaller. If the car rolls over onto its roof, an additional fee may apply on top of the excess.</p>
    </section>

    <section className="space-y-3">
      <TermsSubheading>Cancellations, No Shows &amp; Amendments</TermsSubheading>
      <TermsSubheading>No-Show</TermsSubheading>
      <p>A no-show is when you cancel without telling us before the rental starts, fail to pick the car up at the arranged time and date, fail to provide the required documents, or fail to provide a credit card in the main driver&apos;s name with enough available funds. In these cases, you will receive no refund of the money paid.</p>
      <p>Unicorn Rent A Car Limited reserves the right to refuse the car to any customer who does not arrive on time with the necessary documentation and enough funds for the deposit. Unless the rental was cancelled in advance, the customer is not entitled to a refund.</p>
      <TermsSubheading>Amendments (changes to your booking)</TermsSubheading>
      <p>You can make changes before you are due to pick the car up. If pick-up is less than 48 hours away, please call us. There is no fee for changes made less than 2 weeks before the start date, but changes may affect the rental price. No refund is given for unused days if you pick up later or return earlier than arranged.</p>
      <TermsSubheading>Company Registration Details</TermsSubheading>
      <p>Unicorn Rent A Car Limited, registered office at 66 Muthithi Road, Westlands, Nairobi, Kenya.</p>
    </section>
  </article>
);

const TermsSubheading = ({ children }: { children: React.ReactNode }) => (
  <p className="font-bold text-[#1A1A1A]">{children}</p>
);

const FeatureItem = ({ label }: { label: string }) => (
  <div className="flex items-center gap-4">
    <Check size={18} className="text-[#FF8F00] shrink-0" />
    <span className="text-[15px] font-medium text-[#1A1A1A]">{label}</span>
  </div>
);

interface DriveTypeOptionProps {
  icon: React.ReactNode;
  label: string;
  hint: string;
  selected: boolean;
  onClick: () => void;
  price?: string;
}

const DriveTypeOption: React.FC<DriveTypeOptionProps> = ({ icon, label, hint, selected, onClick, price }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-start gap-4 p-4 rounded-[10px] border-2 text-left transition-all duration-150 ${selected
      ? "border-[#43A047] bg-[#F0FAF0]"
      : "border-[#E5E7EB] bg-white hover:border-[#43A047]/40"
      }`}
  >
    <div
      className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? "border-[#43A047]" : "border-[#D1D5DB]"
        }`}
    >
      {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#43A047]" />}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="text-[#43A047]">{icon}</span>
        <p className="text-[15px] font-bold text-[#1A1A1A] leading-tight">
          {label}
          {price && <span className="text-[#43A047] ml-2 text-[13px]">({price})</span>}
        </p>
      </div>
      <p className="text-[12px] text-[#777777] mt-0.5 ml-7">{hint}</p>
    </div>
  </button>
);

interface BreakdownRowProps {
  label: string;
  value: number;
  bold?: boolean;
  accent?: boolean;
}

const BreakdownRow: React.FC<BreakdownRowProps> = ({ label, value, bold, accent }) => (
  <div className="flex justify-between items-center">
    <span className={`text-[13px] ${bold ? "font-bold text-[#1A1A1A]" : "text-[#666666]"}`}>
      {label}
    </span>
    <span className={`text-[13px] ${bold ? "font-bold" : ""} ${accent ? "text-[#43A047] text-[15px]" : "text-[#1A1A1A]"}`}>
      Ksh {value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
    </span>
  </div>
);

export default CarPropertiesSection;
