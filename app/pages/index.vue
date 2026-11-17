<script setup lang="ts">
import { collection, onSnapshot, query, limit } from 'firebase/firestore'
import { db } from '~/utils/firebase'
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Award,
  Briefcase,
  Newspaper,
  Calendar,
  Handshake,
  Calculator,
  Trees,
  Zap
} from 'lucide-vue-next'

const siteSettings = useState<any>('siteSettings')
const latestServices = ref<any[]>([])
const latestNews = ref<any[]>([])
const partnersList = ref<any[]>([])

// عدادات الأرقام المتحركة
const projectsCount = ref(0)
const partnersCount = ref(0)
const qualityCount = ref(0)

// محاكي الأثر البيئي التفاعلي
const employeeCount = ref(150)
const carbonSaved = computed(() => Math.round(employeeCount.value * 1.8))
const energySaved = computed(() => Math.round(employeeCount.value * 420))
const treesEquivalent = computed(() => Math.round(carbonSaved.value * 45))

onMounted(() => {
  onSnapshot(query(collection(db, 'services'), limit(3)), (snap) => {
    latestServices.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  })

  onSnapshot(query(collection(db, 'news'), limit(3)), (snap) => {
    latestNews.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  })

  onSnapshot(collection(db, 'partners'), (snap) => {
    partnersList.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  })

  // تشغيل عداد الأرقام التصاعدي
  const duration = 1500
  const steps = 40
  const interval = duration / steps
  let step = 0
  const timer = setInterval(() => {
    step++
    projectsCount.value = Math.min(120, Math.round((120 / steps) * step))
    partnersCount.value = Math.min(45, Math.round((45 / steps) * step))
    qualityCount.value = Math.min(100, Math.round((100 / steps) * step))
    if (step >= steps) clearInterval(timer)
  }, interval)
})
</script>

<template>
  <div class="space-y-24">
    
    <!-- قسم الترحيب الرئيسي (Hero Section) -->
    <section class="relative overflow-hidden rounded-3xl border border-slate-800/90 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 p-8 sm:p-14 lg:p-20 text-center shadow-2xl animate-fade-in">
      <div class="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[550px] h-[280px] bg-emerald-500/20 blur-3xl rounded-full"></div>

      <!-- شارة علوية متوهجة -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium mb-6 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
        <Sparkles class="w-4 h-4 animate-spin-slow" />
        <span>رؤية عصرية لحلول الأعمال والاستدامة</span>
      </div>

      <!-- العنوان الرئيسي -->
      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight mb-6">
        مرحباً بكم في
        <span class="bg-gradient-to-l from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
          {{ siteSettings?.companyName || 'مؤسسة الاستدامة' }}
        </span>
      </h1>

      <!-- الوصف -->
      <p class="text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
        {{ siteSettings?.aboutText }}
      </p>

      <!-- أزرار التفاعل -->
      <div class="flex flex-wrap items-center justify-center gap-4">
        <NuxtLink
          to="/services"
          class="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/45 transition-all hover:-translate-y-1"
        >
          <span>استكشف خدماتنا</span>
          <ArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </NuxtLink>

        <NuxtLink
          to="/contact"
          class="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-700 hover:border-emerald-500/40 transition-all hover:-translate-y-1"
        >
          <span>تواصل مع فريقنا</span>
        </NuxtLink>
      </div>

      <!-- شريط الإحصائيات المتحركة -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-14 pt-10 border-t border-slate-800/80">
        <div class="flex items-center justify-center gap-3.5 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/70 hover:border-emerald-500/40 transition-colors">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <TrendingUp class="w-6 h-6" />
          </div>
          <div class="text-right">
            <div class="text-2xl sm:text-3xl font-bold text-white" dir="ltr">+{{ projectsCount }}</div>
            <div class="text-xs text-slate-400">مشاريع مستدامة</div>
          </div>
        </div>

        <div class="flex items-center justify-center gap-3.5 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/70 hover:border-emerald-500/40 transition-colors">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Award class="w-6 h-6" />
          </div>
          <div class="text-right">
            <div class="text-2xl sm:text-3xl font-bold text-white" dir="ltr">+{{ partnersCount }}</div>
            <div class="text-xs text-slate-400">شريك استراتيجي</div>
          </div>
        </div>

        <div class="flex items-center justify-center gap-3.5 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/70 hover:border-emerald-500/40 transition-colors">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck class="w-6 h-6" />
          </div>
          <div class="text-right">
            <div class="text-2xl sm:text-3xl font-bold text-white" dir="ltr">{{ qualityCount }}%</div>
            <div class="text-xs text-slate-400">معايير الجودة</div>
          </div>
        </div>
      </div>
    </section>

    <!-- شريط شركاء النجاح المتحرك (Infinite Marquee) -->
    <section v-if="partnersList.length > 0" class="space-y-4">
      <p class="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
        شركاء يثقون برؤيتنا
      </p>
      <div class="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 py-5 group">
        <!-- تدرج ضبابي على الأطراف لجمالية الدخول والخروج -->
        <div class="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
        <div class="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>

        <div class="flex w-max gap-6 animate-marquee group-hover:[animation-play-state:paused]">
          <div
            v-for="(partner, idx) in [...partnersList, ...partnersList]"
            :key="`${partner.id}-${idx}`"
            class="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 transition-all hover:scale-105 shrink-0"
          >
            <span class="text-2xl">{{ partner.logo || '🤝' }}</span>
            <span class="text-sm font-bold text-slate-200">{{ partner.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- قسم أبرز الخدمات مع بريق ضوئي عند التمرير -->
    <section>
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span class="text-emerald-400 text-sm font-semibold">ماذا نقدم؟</span>
          <h2 class="text-2xl sm:text-3xl font-bold text-white mt-1">أبرز خدماتنا الاحترافية</h2>
        </div>
        <NuxtLink
          to="/services"
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <span>عرض جميع الخدمات</span>
          <ArrowLeft class="w-4 h-4" />
        </NuxtLink>
      </div>

      <div v-if="latestServices.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="srv in latestServices"
          :key="srv.id"
          class="group relative overflow-hidden rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10"
        >
          <!-- خط ضوئي علوي يظهر عند مرور الماوس -->
          <div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div class="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform">
            <span v-if="srv.icon" class="text-2xl">{{ srv.icon }}</span>
            <Briefcase v-else class="w-7 h-7" />
          </div>
          <h3 class="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
            {{ srv.title }}
          </h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            {{ srv.description }}
          </p>
        </div>
      </div>

      <div v-else class="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-10 text-center">
        <Briefcase class="w-10 h-10 text-slate-600 mx-auto mb-3" />
        <p class="text-slate-400 text-sm">لا توجد خدمات مضافة حالياً. أضف أول خدمة من لوحة التحكم لتظهر هنا مباشرة!</p>
      </div>
    </section>

    <!-- محاكي الأثر البيئي التفاعلي (ميزة إعجازية للزوار) -->
    <section class="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900/95 to-emerald-950/30 p-8 sm:p-12 shadow-2xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div class="space-y-5">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold">
            <Calculator class="w-4 h-4" />
            <span>حاسبة الأثر البيئي الذكية</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-white leading-snug">
            احسب حجم الأثر البيئي الذي يمكن لمنشأتك تحقيقه معنا
          </h2>
          <p class="text-slate-300 text-sm leading-relaxed">
            حرّك المؤشر أدناه لتحديد عدد موظفي منشأتك، وشاهد التقدير الفوري لتقليل الانبعاثات الكربونية وتوفير الطاقة سنوياً عند تطبيق حلولنا المستدامة.
          </p>

          <!-- شريط التحكم التفاعلي -->
          <div class="pt-2 space-y-3">
            <div class="flex justify-between text-sm font-bold">
              <span class="text-slate-300">حجم المنشأة (عدد الموظفين):</span>
              <span class="text-emerald-400 text-lg">{{ employeeCount }} موظف</span>
            </div>
            <input
              v-model="employeeCount"
              type="range"
              min="10"
              max="1000"
              step="10"
              class="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div class="flex justify-between text-xs text-slate-500">
              <span>10 موظفين</span>
              <span>500 موظف</span>
              <span>1000 موظف</span>
            </div>
          </div>
        </div>

        <!-- بطاقات النتائج اللحظية -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="rounded-2xl bg-slate-950/80 border border-slate-800 p-5 text-center space-y-2">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
              <Sparkles class="w-5 h-5" />
            </div>
            <div class="text-2xl font-bold text-white">{{ carbonSaved }}</div>
            <div class="text-xs text-slate-400">طن كربون أقل سنوياً</div>
          </div>

          <div class="rounded-2xl bg-slate-950/80 border border-slate-800 p-5 text-center space-y-2">
            <div class="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto">
              <Zap class="w-5 h-5" />
            </div>
            <div class="text-2xl font-bold text-white">{{ energySaved.toLocaleString() }}</div>
            <div class="text-xs text-slate-400">كيلو واط طاقة موفرة</div>
          </div>

          <div class="rounded-2xl bg-slate-950/80 border border-slate-800 p-5 text-center space-y-2">
            <div class="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto">
              <Trees class="w-5 h-5" />
            </div>
            <div class="text-2xl font-bold text-white">{{ treesEquivalent.toLocaleString() }}</div>
            <div class="text-xs text-slate-400">ما يعادل زراعة شجرة</div>
          </div>

          <div class="sm:col-span-3 pt-2">
            <NuxtLink
              to="/contact"
              class="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition-all"
            >
              <span>اطلب دراسة استدامة مخصصة لمنشأتك</span>
              <ArrowLeft class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- قسم آخر الأخبار -->
    <section>
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span class="text-emerald-400 text-sm font-semibold">المركز الإعلامي</span>
          <h2 class="text-2xl sm:text-3xl font-bold text-white mt-1">آخر الأخبار والمستجدات</h2>
        </div>
        <NuxtLink
          to="/news"
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <span>تصفح جميع الأخبار</span>
          <ArrowLeft class="w-4 h-4" />
        </NuxtLink>
      </div>

      <div v-if="latestNews.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article
          v-for="item in latestNews"
          :key="item.id"
          class="group rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
        >
          <div>
            <div class="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full mb-4">
              <Calendar class="w-3.5 h-3.5" />
              <span>{{ item.date || 'خبر حديث' }}</span>
            </div>
            <h3 class="text-lg font-bold text-white mb-3 leading-snug group-hover:text-emerald-300 transition-colors">
              {{ item.title }}
            </h3>
            <p class="text-slate-400 text-sm leading-relaxed line-clamp-3">
              {{ item.content }}
            </p>
          </div>
          <NuxtLink to="/news" class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 mt-5 hover:text-emerald-300">
            <span>اقرأ المزيد</span>
            <ArrowLeft class="w-3.5 h-3.5" />
          </NuxtLink>
        </article>
      </div>

      <div v-else class="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-10 text-center">
        <Newspaper class="w-10 h-10 text-slate-600 mx-auto mb-3" />
        <p class="text-slate-400 text-sm">لا توجد أخبار منشورة حالياً. انشر أول خبر من لوحة التحكم ليظهر هنا فوراً!</p>
      </div>
    </section>

  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}
.animate-spin-slow {
  animation: spin 8s linear infinite;
}
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(50%);
  }
}
.animate-marquee {
  animation: marquee 22s linear infinite;
}
</style>