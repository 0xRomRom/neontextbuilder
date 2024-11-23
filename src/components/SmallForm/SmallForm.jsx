import stl from "./SmallForm.module.css";
import { useEffect, useState } from "react";
import { RiAlertLine } from "react-icons/ri";
import supabase from "../utils/supabase";

const SmallForm = ({
  setName,
  setEmail,
  name,
  email,
  notice,
  setNotice,
  longestSide,
  ledType,
  backplateType,
  backplateShape,
  mountType,
  base64img,
  selectedColor,
  priceEstimate,
  aspectRatio,
  dataType,
}) => {
  const [nameEntered, setNameEntered] = useState(false);
  const [emailEntered, setEmailEntered] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateTextarea = (e) => {
    setNotice(e.target.value);
  };

  const updateEmail = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailEntered(emailRegex.test(enteredEmail));
  };

  useEffect(() => {
    if (!name) {
      return;
    } else {
      setTimeout(() => {
        setNameEntered(true);
        window.scrollTo(0, document.body.scrollHeight);
        return;
      }, 1000);
    }
    if (emailEntered) {
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
        return;
      }, 1000);
    }
  }, [name, setEmailEntered, emailEntered, email]);

  const submitForm = async () => {
    setSubmitting(true);
    try {
      const dbObject = {
        datum: new Date().toISOString().toLocaleString("nl-NL"),
        afbeelding64: base64img,
        prijs_schatting: Math.floor(priceEstimate),
        langste_zijde: longestSide,
        soort_led: ledType,
        kleur_led: ledType === "RGB" ? "N.v.t." : selectedColor.join(", "),
        achterplaat_type: backplateType,
        achterplaat_vorm: backplateShape,
        montage: mountType,
        naam: name,
        email: email,
        beschrijving: notice,
        verhouding: aspectRatio,
        file_format: dataType,
      };

      const recipientBody = `
      <p>Wij hebben uw aanvraag ontvangen!</p>
      <p>Aanvraag details:</p>
      <ul>
        <li>Datum: ${new Date().toLocaleString()}</li>
        <li>Prijsschatting: €${Math.floor(dbObject.prijs_schatting)},-</li>
        <li>Langste zijde: ${dbObject.langste_zijde}</li>
        <li>Soort LED: ${dbObject.soort_led}</li>
        <li>Kleur LED: ${dbObject.kleur_led}</li>
        <li>Soort achterplaat: ${dbObject.achterplaat_type}</li>
        <li>Vorm achterplaat: ${dbObject.achterplaat_vorm}</li>
        <li>Montage systeem: ${dbObject.montage}</li>

        <br/>
        <span>We gaan er mee aan de slag, u ontvangt binnen 2 dagen uw ontwerp.</span>
      </ul>
    `;

      const { error } = await supabase
        .from("logo_samenstellen")
        .insert([dbObject]);
      if (error) {
        alert("Versturen mislukt, probeer het later opnieuw.");
        console.error("Supabase API error:", error.message);
      } else {
        console.log(dbObject);
        try {
          window.Email.send({
            SecureToken: "4892afdd-4fb9-4392-bbf4-b40ce7dc116a",
            To: email,
            From: "aanvraag@ledsgoneon.nl",
            Subject: "Aanvraag ontvangen",
            Body: recipientBody,
          });

          window.location.href = "https://ledsgoneon.nl/bedankt-pagina/";
        } catch (err) {
          setSubmitting(false);
          alert("Fout bij verzenden. Neem contact met ons op!");
          console.error(err);
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className={`${stl.longestRow} ${emailEntered ? stl.checked : ""}`}>
      <h3 className={stl.hero}>Wat is je naam?</h3>
      <input
        type="text"
        className={stl.inputStl}
        placeholder="Voornaam"
        onChange={updateName}
      />
      {nameEntered && (
        <>
          <h3 className={stl.hero2}>Wat is je E-Mail?</h3>
          <input
            type="email"
            className={stl.inputStl}
            placeholder="E-Mail adres"
            onChange={updateEmail}
          />
        </>
      )}
      {nameEntered && emailEntered && (
        <>
          <h3 className={stl.hero2}>Opmerkingen?</h3>

          <textarea
            resize="none"
            className={stl.inputArea}
            placeholder="Plaats ze hier"
            onChange={updateTextarea}
          ></textarea>

          <div className={stl.btnBackground}>
            <button
              className={stl.ledsgo}
              onClick={submitForm}
              disabled={submitting ? true : false}
            >
              LED's Go!
            </button>
          </div>
          <span className={stl.binnengebruik}>
            <RiAlertLine className={stl.alert} /> Lampen alleen geschikt voor
            binnengebruik
          </span>
        </>
      )}
    </div>
  );
};

export default SmallForm;
