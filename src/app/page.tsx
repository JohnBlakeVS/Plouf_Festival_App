"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

// Types
type TimeBlock = "morning" | "afternoon" | "evening";
type DayAvailability = {
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
};

const TIME_BLOCKS = {
  morning: { label: "Matin", time: "9h - 14h" },
  afternoon: { label: "Après-midi", time: "14h - 19h" },
  evening: { label: "Soir", time: "19h - 1h" },
};

// Pour l'instant on hardcode 3 jours, on rendra dynamique plus tard
const FESTIVAL_DAYS = [
  { id: "day1", label: "Vendredi", date: "TBD" },
  { id: "day2", label: "Samedi", date: "TBD" },
  { id: "day3", label: "Dimanche", date: "TBD" },
];

export default function Home() {
  const supabase = createClient();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    motivation: "",
  });
  
  const [availability, setAvailability] = useState<Record<string, DayAvailability>>({
    day1: { morning: false, afternoon: false, evening: false },
    day2: { morning: false, afternoon: false, evening: false },
    day3: { morning: false, afternoon: false, evening: false },
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Toggle availability
  const toggleAvailability = (dayId: string, block: TimeBlock) => {
    setAvailability((prev) => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        [block]: !prev[dayId][block],
      },
    }));
  };

  // Check if at least one slot is selected
  const hasAnyAvailability = () => {
    return Object.values(availability).some(
      (day) => day.morning || day.afternoon || day.evening
    );
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasAnyAvailability()) {
      setErrorMessage("Sélectionne au moins un créneau de disponibilité");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Pour l'instant on log juste, on branchera Supabase après
      console.log("Form data:", formData);
      console.log("Availability:", availability);
      
      // TODO: Insert into Supabase
      // const { error } = await supabase.from("volunteers").insert({...})
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubmitStatus("success");
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      setErrorMessage("Une erreur est survenue. Réessaie plus tard.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--plouf-bg)" }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient inspired by logo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F1C26B] via-[#E6954A] via-[#C9483B] to-[#5B1F14] opacity-20" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            {/* Logo placeholder - remplace par ton vrai logo */}
            <div className="mb-8 flex justify-center">
              <div 
                className="w-48 h-48 md:w-64 md:h-64 rounded-2xl flex items-center justify-center text-6xl"
                style={{ 
                  background: "linear-gradient(180deg, #F1C26B 0%, #E6954A 33%, #C9483B 66%, #5B1F14 100%)",
                }}
              >
                {/* Remplace par <Image src="/logo.png" ... /> */}
                🪂
              </div>
            </div>
            
            <h1 
              className="text-5xl md:text-7xl font-bold mb-4"
              style={{ color: "var(--plouf-primary)" }}
            >
              Le Plouf Festival
            </h1>
            
            <p 
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
              style={{ color: "var(--plouf-text)", opacity: 0.8 }}
            >
              Le festival de parapente le plus fun de Suisse 🇨🇭
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#benevole"
                className="px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
                style={{ 
                  backgroundColor: "var(--plouf-accent)",
                  color: "white",
                }}
              >
                Devenir bénévole
              </a>
              <a
                href="#infos"
                className="px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 border-2"
                style={{ 
                  borderColor: "var(--plouf-primary)",
                  color: "var(--plouf-primary)",
                }}
              >
                En savoir plus
              </a>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
            <path 
              d="M0,60 C300,120 600,0 1200,60 L1200,120 L0,120 Z" 
              style={{ fill: "var(--plouf-bg)" }}
            />
          </svg>
        </div>
      </section>

      {/* Info Section */}
      <section id="infos" className="max-w-6xl mx-auto px-4 py-16">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ color: "var(--plouf-primary)" }}
        >
          Le Festival
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "🏔️",
              title: "3 jours de folie",
              description: "Compétitions, shows aériens et ambiance de feu dans un cadre montagnard unique.",
            },
            {
              icon: "🪂",
              title: "Parapente & Fun",
              description: "Les meilleurs pilotes s'affrontent dans des épreuves spectaculaires.",
            },
            {
              icon: "🎉",
              title: "Concerts & Fête",
              description: "Soirées mémorables avec concerts live et DJs jusqu'au bout de la nuit.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl text-center transition-all hover:scale-105"
              style={{ 
                backgroundColor: "white",
                boxShadow: "0 4px 20px rgba(91, 31, 20, 0.1)",
              }}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 
                className="text-xl font-bold mb-2"
                style={{ color: "var(--plouf-primary)" }}
              >
                {item.title}
              </h3>
              <p style={{ color: "var(--plouf-text)", opacity: 0.7 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Volunteer Form Section */}
      <section 
        id="benevole" 
        className="py-16"
        style={{ backgroundColor: "var(--plouf-primary)" }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Rejoins l'équipe ! 🤘
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              On cherche des bénévoles motivés pour faire de ce festival un moment inoubliable. 
              En échange : repas, boissons, t-shirt et une expérience de dingue !
            </p>
          </div>

          {submitStatus === "success" ? (
            <div 
              className="p-8 rounded-2xl text-center"
              style={{ backgroundColor: "white" }}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--plouf-primary)" }}
              >
                Inscription reçue !
              </h3>
              <p style={{ color: "var(--plouf-text)" }}>
                Merci {formData.firstName} ! On revient vers toi très vite pour confirmer ta participation.
              </p>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit}
              className="p-6 md:p-8 rounded-2xl space-y-6"
              style={{ backgroundColor: "white" }}
            >
              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--plouf-primary)" }}
                  >
                    Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none"
                    style={{ 
                      borderColor: "#E5E5E5",
                      color: "var(--plouf-text)",
                    }}
                    placeholder="Ton prénom"
                  />
                </div>
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--plouf-primary)" }}
                  >
                    Nom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none"
                    style={{ 
                      borderColor: "#E5E5E5",
                      color: "var(--plouf-text)",
                    }}
                    placeholder="Ton nom"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--plouf-primary)" }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none"
                    style={{ 
                      borderColor: "#E5E5E5",
                      color: "var(--plouf-text)",
                    }}
                    placeholder="ton@email.ch"
                  />
                </div>
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--plouf-primary)" }}
                  >
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none"
                    style={{ 
                      borderColor: "#E5E5E5",
                      color: "var(--plouf-text)",
                    }}
                    placeholder="+41 79 123 45 67"
                  />
                </div>
              </div>

              {/* Availability Grid */}
              <div>
                <label 
                  className="block text-sm font-medium mb-4"
                  style={{ color: "var(--plouf-primary)" }}
                >
                  Tes disponibilités *
                </label>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="p-2"></th>
                        {FESTIVAL_DAYS.map((day) => (
                          <th 
                            key={day.id} 
                            className="p-2 text-center text-sm font-semibold"
                            style={{ color: "var(--plouf-primary)" }}
                          >
                            {day.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(Object.keys(TIME_BLOCKS) as TimeBlock[]).map((block) => (
                        <tr key={block}>
                          <td 
                            className="p-2 text-sm"
                            style={{ color: "var(--plouf-text)" }}
                          >
                            <div className="font-medium">{TIME_BLOCKS[block].label}</div>
                            <div className="text-xs opacity-60">{TIME_BLOCKS[block].time}</div>
                          </td>
                          {FESTIVAL_DAYS.map((day) => (
                            <td key={day.id} className="p-2 text-center">
                              <button
                                type="button"
                                onClick={() => toggleAvailability(day.id, block)}
                                className={`w-12 h-12 rounded-xl transition-all hover:scale-110 ${
                                  availability[day.id][block] 
                                    ? "shadow-lg" 
                                    : "border-2 border-dashed"
                                }`}
                                style={{
                                  backgroundColor: availability[day.id][block] 
                                    ? "var(--plouf-accent)" 
                                    : "transparent",
                                  borderColor: availability[day.id][block] 
                                    ? "transparent" 
                                    : "#E5E5E5",
                                  color: availability[day.id][block] ? "white" : "#999",
                                }}
                              >
                                {availability[day.id][block] ? "✓" : ""}
                              </button>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Motivation */}
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--plouf-primary)" }}
                >
                  Pourquoi tu veux être bénévole ? (optionnel)
                </label>
                <textarea
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none resize-none"
                  style={{ 
                    borderColor: "#E5E5E5",
                    color: "var(--plouf-text)",
                  }}
                  placeholder="Dis-nous en quelques mots..."
                />
              </div>

              {/* Error message */}
              {errorMessage && (
                <div 
                  className="p-4 rounded-xl text-center"
                  style={{ backgroundColor: "#FEE2E2", color: "#B91C1C" }}
                >
                  {errorMessage}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-lg font-semibold transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: "var(--plouf-accent)",
                  color: "white",
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Envoi en cours...
                  </span>
                ) : (
                  "Je m'inscris comme bénévole 🙌"
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center" style={{ backgroundColor: "var(--plouf-bg)" }}>
        <p style={{ color: "var(--plouf-text)", opacity: 0.6 }}>
          © 2025 Le Plouf Festival — Made with ❤️ in Switzerland
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <a 
            href="https://plouf-festival.ch" 
            target="_blank"
            className="hover:underline"
            style={{ color: "var(--plouf-accent)" }}
          >
            Site officiel
          </a>
          <span style={{ color: "var(--plouf-text)", opacity: 0.3 }}>•</span>
          <a 
            href="/login" 
            className="hover:underline"
            style={{ color: "var(--plouf-accent)" }}
          >
            Espace staff
          </a>
        </div>
      </footer>
    </main>
  );
}