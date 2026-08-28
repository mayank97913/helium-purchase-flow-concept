"use client";

import { useMemo, useState } from "react";

type FitState = "unknown" | "recommended" | "caution" | "blocked";

const roomOptions = [
  { dimensions: "8 × 10 ft", label: "Compact room", size: 80 },
  { dimensions: "10 × 12 ft", label: "Typical bedroom", size: 120 },
  { dimensions: "12 × 12 ft", label: "Ideal maximum", size: 144 },
];

const PRODUCT_IMAGE = "https://dob3sgaeyrmmz.cloudfront.net/public/catalogimg/Catalog+Images/1.webp";
const LOGO_IMAGE = "https://dob3sgaeyrmmz.cloudfront.net/public/logo/navlogo1.webp";

function getFit(size: number | null): FitState {
  if (size === null) return "unknown";
  if (size <= 144) return "recommended";
  if (size <= 154) return "caution";
  return "blocked";
}

export default function Home() {
  const [quantity, setQuantity] = useState(1);
  const [activeRoom, setActiveRoom] = useState(0);
  const [roomSizes, setRoomSizes] = useState<Array<number | null>>([null]);
  const [customValues, setCustomValues] = useState([""]);
  const [warningAccepted, setWarningAccepted] = useState([false]);
  const [installationSelected, setInstallationSelected] = useState(true);

  const currentSize = roomSizes[activeRoom] ?? null;
  const currentFit = getFit(currentSize);
  const roomFits = useMemo(() => roomSizes.map(getFit), [roomSizes]);
  const roomFitComplete = roomFits.every((fit, index) =>
    fit === "recommended" || (fit === "caution" && warningAccepted[index])
  );
  const readyToBuy = roomFitComplete && installationSelected;
  const installationTotal = 1299 * quantity;

  function changeQuantity(next: number) {
    const safeNext = Math.max(1, Math.min(5, next));
    setQuantity(safeNext);
    setRoomSizes((rooms) => Array.from({ length: safeNext }, (_, index) => rooms[index] ?? null));
    setCustomValues((values) => Array.from({ length: safeNext }, (_, index) => values[index] ?? ""));
    setWarningAccepted((values) => Array.from({ length: safeNext }, (_, index) => values[index] ?? false));
    setActiveRoom((room) => Math.min(room, safeNext - 1));
  }

  function updateRoom(size: number | null, customValue = "") {
    setRoomSizes((rooms) => rooms.map((room, index) => index === activeRoom ? size : room));
    setCustomValues((values) => values.map((value, index) => index === activeRoom ? customValue : value));
    setWarningAccepted((values) => values.map((value, index) => index === activeRoom ? false : value));
  }

  function selectPreset(size: number) {
    updateRoom(size, "");
  }

  function enterCustom(value: string) {
    const parsed = Number(value);
    updateRoom(Number.isFinite(parsed) && parsed > 0 ? parsed : null, value);
  }

  function acceptWarning(checked: boolean) {
    setWarningAccepted((values) => values.map((value, index) => index === activeRoom ? checked : value));
  }

  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <img src={LOGO_IMAGE} alt="Helium" />
        <div className="nav-links"><span>Why Helium</span><span>Profile</span><b>Buy Now</b></div>
      </nav>

      <section className="product-shell">
        <div className="gallery">
          <div className="gallery-thumbs" aria-label="Product images">
            {[1, 2, 3, 4].map((item) => <button className={item === 1 ? "active" : ""} key={item} aria-label={`View image ${item}`}><img src={PRODUCT_IMAGE} alt="" /></button>)}
          </div>
          <div className="hero-image"><img src={PRODUCT_IMAGE} alt="Helium Air conditioner" /><span>1 / 9</span></div>
        </div>

        <section className="purchase-panel" aria-labelledby="product-title">
          <h1 id="product-title">Helium Air</h1>
          <p className="tonnage">Tonnage — 0.8 Ton <i /> Ideal for rooms up to 12 × 12 ft</p>
          <div className="price-line"><s>₹33,983 + GST</s><strong>₹18,490</strong><span>+ GST</span><em>46% Extended launch offer</em></div>
          <div className="review-line"><b>4.0</b><span className="stars">★★★★<i>★</i></span><span>· 210 reviews on Google</span></div>

          <div className="quantity-row">
            <div><span>Number of ACs</span><small>₹500 off on each additional unit</small></div>
            <div className="quantity-control"><button disabled={quantity === 1} onClick={() => changeQuantity(quantity - 1)} aria-label="Decrease quantity">−</button><strong>{quantity}</strong><button disabled={quantity === 5} onClick={() => changeQuantity(quantity + 1)} aria-label="Increase quantity">+</button></div>
          </div>

          <section className="room-fit" aria-labelledby="room-fit-title">
            <header>
              <div><span className="required">REQUIRED</span><h2 id="room-fit-title">Check your room fit</h2></div>
              <details className="measure-tip"><summary>How to measure?</summary><p>Measure the room wall to wall. Length × width gives the area. For example, 12 × 12 ft = 144 sq ft.</p></details>
            </header>

            {quantity > 1 && (
              <div className="room-tabs" role="tablist" aria-label="Rooms for each AC">
                {roomSizes.map((size, index) => {
                  const fit = getFit(size);
                  return <button className={activeRoom === index ? "active" : ""} key={index} onClick={() => setActiveRoom(index)} role="tab">Room {index + 1}<i className={fit} /></button>;
                })}
              </div>
            )}

            <p className="room-prompt">{quantity > 1 ? `Select the room size for AC ${activeRoom + 1}.` : "What is the size of the room where this AC will be installed?"}</p>
            <div className="room-options" role="group" aria-label={`Select size for room ${activeRoom + 1}`}>
              {roomOptions.map((option) => (
                <button className={currentSize === option.size && customValues[activeRoom] === "" ? "selected" : ""} key={option.size} onClick={() => selectPreset(option.size)}>
                  <strong>{option.dimensions}</strong><span>{option.size} sq ft</span><small>{option.label}</small>
                </button>
              ))}
              <label className={customValues[activeRoom] ? "custom selected" : "custom"}>
                <span>Custom size</span><div><input aria-label="Custom room size in square feet" inputMode="numeric" min="1" onChange={(event) => enterCustom(event.target.value)} placeholder="Enter" type="number" value={customValues[activeRoom]} /><b>sq ft</b></div>
              </label>
            </div>

            {currentFit === "unknown" && <p className="fit-inline neutral"><span>↗</span> Select a room size to check whether Helium Air is the right fit.</p>}
            {currentFit === "recommended" && <p className="fit-inline recommended"><span>✓</span> <b>Good fit.</b> Helium Air is suited for a {currentSize} sq ft room.</p>}
            {currentFit === "caution" && (
              <div className="fit-inline caution"><span>!</span><div><b>Slightly above the ideal room size.</b><p>Your room exceeds 144 sq ft. The AC may take longer to cool, especially on hot afternoons or in sun-facing rooms.</p><label><input checked={warningAccepted[activeRoom]} onChange={(event) => acceptWarning(event.target.checked)} type="checkbox" /> I understand and want to continue with this room size.</label></div></div>
            )}
            {currentFit === "blocked" && <div className="fit-inline blocked"><span>×</span><div><b>Helium Air is not recommended for this room.</b><p>At {currentSize} sq ft, cooling may be slow and the room may not reach the set temperature. Choose a higher-capacity AC.</p><button>Talk to a cooling expert</button></div></div>}

            {quantity > 1 && activeRoom < quantity - 1 && currentFit !== "unknown" && currentFit !== "blocked" && (currentFit !== "caution" || warningAccepted[activeRoom]) && <button className="next-room" onClick={() => setActiveRoom(activeRoom + 1)}>Continue to Room {activeRoom + 2} →</button>}
          </section>

          <section className="installation-card" aria-labelledby="installation-title">
            <label className="installation-select">
              <input checked={installationSelected} onChange={(event) => setInstallationSelected(event.target.checked)} type="checkbox" />
              <span className="installation-heading">
                <span className="installation-icon">✓</span>
                <span><small>STANDARD INSTALLATION</small><strong id="installation-title">₹1,299 + GST <i>per AC</i></strong></span>
              </span>
              <span className="install-selected">{installationSelected ? "Selected" : "Select to continue"}</span>
            </label>
            <p className="installation-note">Required to install, commission and activate your AC. Pay after successful installation.</p>
            {!installationSelected && <p className="installation-required">Please select standard installation to continue. Helium-authorised installation is required for commissioning and warranty coverage.</p>}
            <details className="installation-details">
              <summary><span>What is included?</span><b>See details <i>+</i></b></summary>
              <div className="installation-content">
                <div className="why-install">
                  <strong>Smaller AC. Same skilled installation.</strong>
                  <p>The AC costs less because it is right-sized for compact rooms. The installation still needs a technician to travel, mount two units, connect the piping and wiring, test cooling and commission the AC safely.</p>
                </div>
                <div className="install-grid">
                  <div>
                    <span>Included in ₹1,299</span>
                    <ul>
                      <li>Indoor-unit mounting and safe outdoor-unit placement</li>
                      <li>One hole through a brick wall</li>
                      <li>In-box copper, drain pipe and standard wire connection</li>
                      <li>Commissioning, performance check and app demo</li>
                    </ul>
                  </div>
                  <div>
                    <span>Only if your site needs it</span>
                    <p>Any extra material or site work is quoted before use and charged only with your approval.</p>
                    <div className="common-extras"><span>ODU stand <b>₹800</b></span><span>Extra copper <b>₹1,050/m</b></span><span>Old AC dismantling <b>₹900</b></span></div>
                    <a href="https://heliumair.in/Installation%20Leaflet.pdf" rel="noreferrer" target="_blank">See the full installation rate card ↗</a>
                  </div>
                </div>
              </div>
            </details>
          </section>

          <button className="buy-button" disabled={!readyToBuy}>{readyToBuy ? `Buy Now · ${quantity} ${quantity === 1 ? "unit" : "units"}` : roomFits.includes("blocked") ? "Room size not suitable" : !roomFitComplete ? "Complete room fit to continue" : "Select standard installation to continue"}</button>
          <div className="payment-note"><span><b>Pay now</b> AC purchase</span><i>→</i><span><b>Pay after installation</b> ₹{installationTotal.toLocaleString("en-IN")} + GST {quantity > 1 ? `for ${quantity} ACs` : ""}</span></div>
          <p className="record-note">Room-size selections are saved with the order for installation planning.</p>
          <div className="confidence"><span>COD Available</span><span>10Y Warranty</span><span>Free Shipping</span><span>10-day Replacement</span></div>
        </section>
      </section>

      <section className="sizing-section">
        <details>
          <summary>
            <span className="tip-icon">↗</span>
            <div><span>SIZING TIP</span><strong>Ideal for rooms up to 12 × 12 ft · 144 sq ft</strong></div>
            <em>See what affects cooling <b>+</b></em>
          </summary>
          <div className="sizing-content"><p>Room area is the starting point. Top-floor heat, strong afternoon sun, tall ceilings, large windows, open doors and extra occupants can increase cooling time.</p><p>If your room is 145–154 sq ft, Helium Air may still work but will take longer to cool. Above 154 sq ft, choose a higher-capacity AC.</p></div>
        </details>
      </section>
    </main>
  );
}
