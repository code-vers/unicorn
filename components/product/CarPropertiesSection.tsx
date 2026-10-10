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
type TabId = "properties" | "rental-terms";

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
              <div className="space-y-6 text-[14px] text-[#444444] leading-[1.8]">
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Car Rental Terms & Conditions</h4>
                  <p>EEZEE RENTAL CARS LTD. is a franchisee incorporated in the Republic of Kenya (hereinafter called "the company") under GreenMotion International Car and Van Rental hereby agrees to let on hire to the person whose name appears overleaf (hereinafter called The Renter) the motor vehicle described overleaf (together with all tyres, tools, spares and accessories carried with it) is hereinafter called "the vehicle" subject to the terms and conditions contained overleaf and hereunder.</p>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Delivery and Return</h4>
                  <p>The Renter acknowledges that the vehicle is in good overall condition and without apparent defects and that the Renter will return it to the company together with all documents relating thereto in the same condition as when received to the place and during normal business hours on the date specified overleaf or to such place and such other time as the Company may direct.</p>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Conditions of Use</h4>
                  <p>The Renter covenants and agrees that the Renter shall not during the period of hire do or attempt to do or permit to be done in relation to the Vehicle any of the following acts: Permit the vehicle to be driven by any other person other than the Renter or another person designated by the Renter and approved of in writing by the Company in the space provided overleaf; by any person not in possession of a valid driving license recognized in the Republic of Kenya; by any person while such person is under the influence of alcohol, hallucinatory drug, narcotic, barbiturates or any other substance impairing the driver&apos;s consciousness or ability to react.</p>
                  <p className="mt-2">Permit the vehicle to be used for any transportation of persons or goods for hire of reward; in any rally speed test or contest; for propelling or towing any vehicle trailer or other object; in contravention of any traffic regulations; on roads which are not all-weather roads outside Kenya.</p>
                  <p className="mt-2">Sell pledge charge or otherwise part with the possession of the vehicle otherwise than to the Company or do or permit to be done any act which may prejudice or endanger the file of the Company to the Vehicle. Make or cause or permit to be done any repair adjustment or alteration to the Vehicle on any part thereof without the consent in writing of the Company.</p>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Collision Damage Waiver (CDW) / Insurance / TPW</h4>
                  <p>CDW, TW are options available for an additional charge which when offered and accepted at the time of rental waives or reduces the customer&apos;s liability for loss of or damage to rental car provided the car is used in accordance with all the terms and conditions of the rental agreement. In all cases the customers liability. Excess Liability Waiver (ELW) option is available for an additional charge per day. Tyres, tubes, windows and tools are not included.</p>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Charges</h4>
                  <p>The Renter hereby agrees to pay or reimburse to the company or demand the following sums: The charge set out overleaf or if so let out the Company&apos;s current Tariff for the Vehicle in question at the beginning of the rental and it is hereby expressly agreed that the distance travelled shall be conclusively determined by the reading of the standard distance recording device fitted to the vehicle.</p>
                  <p className="mt-2">Any charges for refueling collision damage waiver personal accident insurance and any other standard or miscellaneous charges at the rates shown in this agreement or in the Company current tariff. Any taxes on the rental or the amount charged by the Company as reimbursement for them. Any fines penalties legal costs and fees and other expenses incurrent in collecting payments due from the Renter under the Agreement or imposed on the Company by law arising from the use of the vehicle while on rental to the Renter. Interest at 3% per month on charges remaining unpaid after 30 days from date of income.</p>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Damages to the Vehicle</h4>
                  <p>Regardless of fault, the Renter is responsible for loss of or damage to the car resulting from any cause other than accidental file or acts of nature (for example, collision, rollover, theft or vandalism). If the car is used as permitted by this agreement, this responsibility is limited to the value of the car at the time it is lost or damaged less its salvage value, appraisal fees or recovery cost.</p>
                  <p className="mt-2">If the Renter accepts collision damage waiver, which is not insurance, at the beginning of rental, such loss or damage unless it results from: The international loss or damage to the car by the Renter or by the additional driver. The Renter&apos;s use or the additional driver&apos;s use as prohibited by paragraph 2 above or recklessly, abusively wantonly or with gross negligence including if the Renter leaves the car and fails to remove the keys or lock all doors and the trunk.</p>
                  <p className="mt-2">Where loss or damage to the vehicle occurs while the vehicle is being used operated or driven or in control of any person in breach of any of the terms of this agreement or of any laws or regulations for the time being in force in the republic of Kenya the Renter shall pay to the company arising from the said loss or damage together with all incidental costs and expenses. The liability of the Renter may be entitled from any third party.</p>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Accidents</h4>
                  <p>In the event of an accident or occurrence which might be prejudicial to the company taking place the Renter hereby undertakes: Not to admit liability for such accident. To report such accident to the police and to the company not later than twenty four (24) hours from the time of the accident or occurrence taking place. To complete an accurate accident report at the Company and to provide full details of the identities of other parties involved in the accident, witnesses and police officers.</p>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Insurance</h4>
                  <p>The company shall insure the vehicle so as to comply with the laws of the republic of Kenya relating to compulsory insurance of motor vehicle and shall if required make a copy of the said policy available to the Renter for inspection PROVIDED ALWAYS THAT the said cover shall not extend to the property of the Renter.</p>
                  <p className="mt-2">In the event of any sum becoming unrecoverable under the said policy in whole or in part in consequence of any act or default of the Renter, the Renter shall pay to the Company all damage suffered by reason of the Company being unable to recover the loss or damage suffered by it.</p>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Indemnity</h4>
                  <p>The company shall not be responsible for the damage suffered by the Renter or by third parties arising in connection with the operation of the vehicle or loss or damage to the Renter&apos;s property left in the vehicle or loss or inconvenience resulting from delays in delivery breakdown or other causes beyond the control of the company.</p>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Liability for Fines, Penalties & Forfeitures</h4>
                  <p>Without prejudice to the above provisions the Renter shall be solely liable and responsible for all fines, penalties and forfeitures imposed by reason any breach by the Renter or any other person in control of the vehicle of any law by law or other regulations of any competent authority, and Renter shall on completion of the rental hand over to the Company all demands, summons, processes and notification in connection with or arising out of the commissions of any offence in relation the use of the vehicle and notifications of any penalties and charges incurred by the Renter during the period of hire.</p>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Variation of Terms</h4>
                  <p>No waiver or variation of the terms hereof shall be binding on the company unless authorized in writing and signed by a director of the company.</p>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Disputes</h4>
                  <p>It is understood and agreed that any dispute or claims arising under this Agreement shall be subject to the sole jurisdiction of the court of Kenya.</p>
                </div>
                <div className="bg-[#FFF4E5] p-5 rounded-[8px] mt-4">
                  <p className="text-[13px] text-[#444444]">
                    <strong className="text-[#1A1A1A]">Declaration:</strong> I the undersigned warrant the above particulars are true. I am renting the above vehicle in good condition and I&apos;m liable to pay for any damages caused to this car. I fully understand that I am the only person authorized to drive this vehicle (unless otherwise speeded above) and undertake to return this vehicle by not later than the date stated above. This rental is subject to the Company&apos;s terms and conditions as set out on the reverse of this customer copy of this agreement with conditions. I have read and agreed by my signature to accept as the conditions of this agreement with the company. Interest will be 3% per month on charge remaining unpaid after 30 days.
                  </p>
                </div>
              </div>
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
