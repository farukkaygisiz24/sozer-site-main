export default function BackgroundWatermark() {
  return (
    <div aria-hidden="true" className="site-watermark pointer-events-none fixed inset-0 z-40">
      <img
        src="/images/onlylogo-watermark.png"
        alt=""
        width={512}
        height={512}
        className="site-watermark__image"
        decoding="async"
      />
    </div>
  );
}
