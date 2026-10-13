/* ==========================================================
   data.js — Semua konten portofolio ada di sini.
   Edit file ini saja untuk mengganti teks, proyek, skill, dll.
   Nilai kosong ("" atau []) = bagian itu otomatis disembunyikan.
   Tanda  TODO  = perlu dikonfirmasi / diisi oleh pemilik.
   ========================================================== */

window.PORTFOLIO = {
  name: "Zulfadhli Fayyadh",
  wordmark: "ZF.",
  role: "Siswa SMK RPL • Aspiring Developer",
  tagline: "A developer in progress, building things that matter.",
  heroTitle: ["Membangun ide,", "satu proyek", "dalam satu waktu."],
  heroAccent: "satu proyek", // baris yang diberi warna aksen
  shortBio:
    "Siswa SMK Rekayasa Perangkat Lunak yang sedang membangun fondasi programming lewat proyek pribadi: web, aplikasi, dan eksperimen dengan teknologi AI.",
  location: "", // TODO: isi jika ingin ditampilkan, mis. "Indonesia"

  /* ---------- KONTAK (TODO: isi sendiri; yang kosong disembunyikan) ---------- */
  email: "", // TODO
  socialLinks: {
    github: "", // TODO: mis. "https://github.com/username"
    instagram: "", // TODO
    linkedin: "" // TODO
  },

  /* ---------- ABOUT ---------- */
  about: {
    paragraphs: [
      "Saya siswa SMK jurusan Rekayasa Perangkat Lunak. Saat ini saya sedang membangun fondasi programming dan mencoba mengubah ide menjadi proyek yang benar-benar bisa dipakai, bukan hanya latihan di kelas.",
      "Saya belajar paling cepat saat membangun sesuatu: mencoba, rusak, debugging, lalu memperbaikinya. Karena itu proyek pribadi menjadi bagian terbesar dari proses belajar saya.",
      "Saya juga memakai AI coding tools untuk membantu debugging, refactoring, dan mengeksplorasi ide, sambil tetap berusaha memahami kode yang dihasilkan."
    ],
    facts: [
      { label: "Fokus saat ini", value: "Web development dan proyek pribadi" },
      { label: "Sedang dipelajari", value: "HTML, CSS, JavaScript, dan integrasi API" },
      { label: "Pendekatan", value: "Bangun versi kecil dulu, perbaiki sambil jalan" },
      { label: "Minat", value: "UI/UX yang responsif dan teknologi AI" }
    ]
  },

  /* ---------- PROYEK ----------
     status : "Concept" | "In Progress" | "Prototype" | "Completed"
     preview: "kana" | "chat" | "shield" | "launcher" (visual buatan CSS)
     tech   : isi hanya yang sudah terkonfirmasi (kosong = "belum dikonfirmasi")
     features[].done : true = sudah berjalan, false = direncanakan
     demo / source : isi URL jika benar-benar ada; kosong = tidak ditampilkan
     TODO: konfirmasi status, tech, fitur, dan link tiap proyek. */
  projects: [
    {
      id: "kotomichi",
      name: "Kotomichi",
      category: "Education / Web App",
      group: "Education",
      status: "In Progress", // TODO konfirmasi
      preview: "kana",
      description:
        "Konsep aplikasi belajar bahasa Jepang yang menggabungkan latihan, penulisan kana, kosakata, dan gamifikasi.",
      summary:
        "Aplikasi web untuk belajar bahasa Jepang dengan pendekatan latihan singkat dan terukur.",
      problem: "", // TODO
      goal: "Menggabungkan latihan kosakata, menulis kana, dan gamifikasi dalam satu tempat belajar.",
      features: [
        { text: "Latihan kosakata", done: false },
        { text: "Latihan menulis kana", done: false },
        { text: "Speaking practice", done: false },
        { text: "Gamifikasi", done: false },
        { text: "Target belajar", done: false },
        { text: "Progress tracking", done: false }
      ],
      tech: [], // TODO
      challenges: [], // TODO
      demo: "",
      source: ""
    },
    {
      id: "zeph-ai",
      name: "Zeph AI",
      category: "AI / Web App",
      group: "AI",
      status: "Prototype", // TODO konfirmasi
      preview: "chat",
      description:
        "Eksperimen pengembangan antarmuka AI chat berbasis web dan integrasi API.",
      summary:
        "Proyek web untuk bereksperimen dengan antarmuka chat dan cara menghubungkannya ke API AI.",
      problem: "", // TODO
      goal: "Memahami cara membangun antarmuka chat yang nyaman dan menghubungkannya ke API AI.",
      features: [
        { text: "Antarmuka chat berbasis web", done: false },
        { text: "Integrasi API AI", done: false }
      ],
      tech: [], // TODO
      challenges: [], // TODO
      demo: "",
      source: ""
    },
    {
      id: "zentris",
      name: "Zentris",
      category: "Discord Bot",
      group: "Bot",
      status: "Concept", // TODO konfirmasi
      preview: "shield",
      description:
        "Konsep bot Discord untuk membantu moderasi dan keamanan server.",
      summary: "Ide bot Discord yang berfokus pada keamanan server dan moderasi.",
      problem: "", // TODO
      goal: "Membantu admin server menjaga komunitas tetap aman dan tertib.",
      features: [
        { text: "Moderasi server", done: false },
        { text: "Fitur keamanan server", done: false }
      ],
      tech: [], // TODO
      challenges: [], // TODO
      demo: "",
      source: ""
    },
    {
      id: "minecraft-launcher",
      name: "Minecraft Launcher",
      category: "Software / Launcher",
      group: "Software",
      status: "Concept", // TODO konfirmasi
      preview: "launcher",
      description:
        "Eksplorasi ide pembuatan launcher Minecraft dengan pengalaman pengelolaan game yang terintegrasi.",
      summary:
        "Eksplorasi launcher Minecraft dengan pengelolaan akun dan mod dalam satu aplikasi.",
      problem: "", // TODO
      goal: "Merancang pengalaman mengelola game yang terintegrasi.",
      features: [
        { text: "Pengelolaan akun", done: false },
        { text: "Dukungan mod", done: false },
        { text: "Pengelolaan game terintegrasi", done: false }
      ],
      tech: [], // TODO
      challenges: [], // TODO
      demo: "",
      source: ""
    }
  ],

  /* ---------- SKILLS ----------
     level: "Learning" | "Practicing" | "Familiar"
     TODO: sesuaikan level dengan kemampuan sebenarnya. */
  skills: [
    {
      category: "Frontend Development",
      items: [
        { name: "HTML", level: "Practicing" },
        { name: "CSS", level: "Practicing" },
        { name: "JavaScript", level: "Learning" },
        { name: "Responsive design", level: "Practicing" }
      ]
    },
    {
      category: "Programming Fundamentals",
      items: [
        { name: "Logika & algoritma", level: "Learning" },
        { name: "Debugging", level: "Practicing" },
        { name: "Struktur kode", level: "Learning" }
      ]
    },
    {
      category: "Tools & Workflow",
      items: [
        { name: "Git & GitHub", level: "Learning" },
        { name: "Deployment (mis. Vercel)", level: "Learning" }
      ]
    },
    {
      category: "UI/UX Exploration",
      items: [
        { name: "Layout & hierarki visual", level: "Practicing" },
        { name: "Design system", level: "Learning" },
        { name: "Aksesibilitas dasar", level: "Learning" }
      ]
    },
    {
      category: "AI-Assisted Development",
      items: [
        { name: "AI coding tools", level: "Practicing" },
        { name: "Prompting untuk debugging & refactoring", level: "Practicing" },
        { name: "Integrasi API AI", level: "Learning" }
      ]
    }
  ],

  /* ---------- JOURNEY ----------
     date : isi jika sudah pasti (mis. "2025"); kosong = disembunyikan
     state: "" | "Berjalan" | "Selesai"  (kosong = disembunyikan)
     TODO: konfirmasi urutan, tanggal, dan status. */
  learningMilestones: [
    {
      title: "Mempelajari fondasi web development",
      text: "Mengenal HTML, CSS, dan JavaScript sebagai dasar membangun website.",
      date: "",
      state: ""
    },
    {
      title: "Mulai membangun proyek pribadi",
      text: "Mengubah ide menjadi proyek nyata di luar tugas sekolah.",
      date: "",
      state: ""
    },
    {
      title: "Bereksperimen dengan integrasi API",
      text: "Menghubungkan antarmuka web dengan layanan lain, termasuk API AI.",
      date: "",
      state: ""
    },
    {
      title: "Menggunakan AI tools dalam proses coding",
      text: "Memakai AI untuk debugging, refactoring, dan eksplorasi ide.",
      date: "",
      state: ""
    },
    {
      title: "Debugging dan penyempurnaan UI",
      text: "Belajar menemukan sumber masalah dan merapikan tampilan agar nyaman dipakai.",
      date: "",
      state: ""
    },
    {
      title: "Mengembangkan proyek menjadi lebih matang",
      text: "Target berikutnya: struktur kode lebih baik dan produk yang lebih utuh.",
      date: "",
      state: ""
    }
  ],

  /* ---------- CURRENT FOCUS ---------- */
  currentFocus: [
    "Memperkuat dasar JavaScript",
    "Meningkatkan kualitas UI dan responsive design",
    "Mempelajari integrasi API",
    "Mengembangkan proyek pribadi dengan struktur kode yang lebih baik"
  ],

  footerNote: "Dibuat dengan HTML, CSS, dan JavaScript. Masih terus belajar."
};