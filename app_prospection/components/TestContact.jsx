// app/components/TestContact.jsx
"use client";
import { useState } from "react";
import { getBestContact } from "@/utils/fetchContact";

export default function TestContact() {
  const [contact, setContact] = useState(null);
  const [companyName, setCompanyName] = useState("Decathlon");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const result = await getBestContact(companyName);
    setContact(result);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Tester la recherche de contact</h2>
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="border p-2 mb-4 w-full"
        placeholder="Entrez le nom de l'entreprise"
      />
      <button
        onClick={handleClick}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {loading ? "Chargement..." : "Chercher un contact"}
      </button>
      
      {contact && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h3 className="font-semibold text-lg">Contact trouvé :</h3>
          <pre>{JSON.stringify(contact, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
// JavaScript Document