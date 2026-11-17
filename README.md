# 🌱 مؤسسة استدامة للحلول البيئية والتنموية | Istidama Web Platform

منصة ويب متكاملة وحديثة مصممة لتقديم حلول الاستدامة، كفاءة الطاقة، والتحول الأخضر، مزوّدة بلوحة تحكم إدارية محمية لإدارة المحتوى لحظياً (Real-time CMS).

🔗 **رابط الموقع الحي (Live Demo):** [https://istidama-web.web.app](https://istidama-web.web.app)

---

## ✨ أبرز المزايا (Key Features)

- **واجهة مستخدم عصرية وتفاعلية (Interactive UI/UX):** تصميم زجاجي داكن (Glassmorphism) متجاوب بالكامل مع جميع الشاشات، يدعم اللغة العربية (RTL) بسلاسة.
- **حاسبة الأثر البيئي الذكية (Sustainability Impact Simulator):** أداة تفاعلية تتيح للزوار حساب التقدير الفوري لتقليل الانبعاثات الكربونية وتوفير الطاقة بناءً على حجم المنشأة.
- **تأثيرات بصرية متقدمة:** شريط شركاء متحرك لا نهائي (Infinite Marquee)، عدادات إحصائية حية، شريط تقدم القراءة، وتوهج تفاعلي يتبع مؤشر الماوس.
- **لوحة تحكم إدارية محمية (`/admin`):**
  - تعديل هوية المؤسسة، الشعار، الرؤية، الرسالة، وبيانات التواصل لحظياً.
  - إضافة وحذف الخدمات، الشركاء، والأخبار مع انعكاس التغييرات فوراً على صفحات الزوار.
  - استقبال وإدارة رسائل الزوار الواردة من صفحة التواصل.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

- **Frontend Framework:** [Nuxt](https://nuxt.com/) & [Vue.js](https://vuejs.org/)
- **Styling & Icons:** [Tailwind CSS](https://tailwindcss.com/) & [Lucide Vue Icons](https://lucide.dev/)
- **Database:** [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore) (Real-time synchronization)
- **Authentication:** [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Hosting:** [Firebase Hosting](https://firebase.google.com/docs/hosting)

---

## 📂 هيكلة المشروع (Project Structure)

```text
istidama-web/
├── app/
│   ├── layouts/
│   │   └── default.vue        # الهيكل العام، الشريط العلوي، والفوتر
│   ├── pages/
│   │   ├── index.vue          # الصفحة الرئيسية وحاسبة الأثر البيئي
│   │   ├── about.vue          # نبذة عن الشركة، الرؤية والرسالة
│   │   ├── services.vue       # صفحة الخدمات
│   │   ├── partners.vue       # صفحة شركاء النجاح
│   │   ├── news.vue           # المركز الإعلامي والأخبار
│   │   ├── contact.vue        # صفحة التواصل والدعم
│   │   └── admin.vue          # لوحة التحكم الإدارية المحمية
│   └── utils/
│       └── firebase.ts        # إعدادات الربط مع Firebase
├── nuxt.config.ts             # إعدادات Nuxt
└── package.json               # الحزم والمكتبات البرمجية
