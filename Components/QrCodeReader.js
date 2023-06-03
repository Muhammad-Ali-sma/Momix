import { useRef } from "react";
import { QrReader } from "react-qr-reader";

export default function QRCodeReader({ onResult }) {
  const lastResult = useRef()

  const onReadResult = (result, error) => {
    if (!result) return;

    // This callback will keep existing even after 
    // this component is unmounted
    // So ignore it (only in this reference) if result keeps repeating
    if (lastResult.current === result.text) {
      return
    }

    lastResult.current = result.text;
    onResult(result.text);
  };

  return (
    <>
      {
        process.env.NODE_ENV == "development" ?
          <input type={"text"} onChange={(e) => {
            onReadResult({text: e.target.value});
          }} />
          :
          <QrReader
            scanDelay={500}
            constraints={{ facingMode: { ideal: "environment" } }}
            onResult={onReadResult}
            style={{ width: '100%' }}
          />
      }
    </>

  )
}