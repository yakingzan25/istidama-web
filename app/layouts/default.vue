<script setup lang="ts">
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '~/utils/firebase'
import {
  Leaf,
  Home,
  Info,
  Briefcase,
  Handshake,
  Newspaper,
  Mail,
  Settings,
  Menu,
  X,
  Phone,
  MapPin,
  ArrowUp,
  MessageCircle
} from 'lucide-vue-next'

const mobileMenuOpen = ref(false)
const scrollProgress = ref(0)
const showBackToTop = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

const siteSettings = useState('siteSettings', () => ({
  companyName: 'مؤسسة الاستدامة',
  logo: '🌱',
  tagline: 'نبتكر حلولاً مستدامة تصنع أثراً إيجابياً للمستقبل',
  aboutText: 'نحن مؤسسة رائدة نعمل على تقديم حلول مبتكرة ومستدامة لعملائنا وشركائنا وفق أعلى معايير الجودة والاحترافية، لبناء مستقبل أكثر ازدهاراً واستقراراً.',
  vision: 'الريادة والتميز في بناء مشاريع وحلول مؤسسية مستدامة تواكب تطلعات المستقبل.',
  mission: 'تمكين المؤسسات والأفراد من خلال خدمات متكاملة وشراكات استراتيجية فاعلة ذات أثر ملموس.',
  phone: '920000000',
  email: 'info@istidama.com',
  address: 'المدينة المنورة، المملكة العربية السعودية'
}))

const handleScroll = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
  showBackToTop.value = scrollTop > 400
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  const settingsRef = doc(db, 'settings', 'general')
  onSnapshot(settingsRef, (docSnap) => {
    if (docSnap.exists()) {
      siteSettings.value = { ...siteSettings.value, ...docSnap.data() }
    }
  })

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('mousemove', handleMouseMove)
})

const navLinks = [
  { name: 'الرئيسية', path: '/', icon: Home },
  { name: 'نبذة عن الشركة', path: '/about', icon: Info },
  { name: 'الخدمات', path: '/services', icon: Briefcase },
  { name: 'الشركاء', path: '/partners', icon: Handshake },
  { name: 'الأخبار', path: '/news', icon: Newspaper },
  { name: 'التواصل والدعم', path: '/contact', icon: Mail }
]
</script>

<template>
  <div dir="rtl" class="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-x-hidden">
    
    <!-- شريط تقدم القراءة العلوي -->
    <div class="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent">
      <div
        class="h-full bg-gradient-to-l from-emerald-400 via-teal-400 to-cyan-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] transition-all duration-150"
        :style="{ width: `${scrollProgress}%` }"
      ></div>
    </div>

    <!-- شبكة هندسية دقيقة + توهج يتبع مؤشر الماوس -->
    <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b33_1px,transparent_1px),linear-gradient(to_bottom,#1e293b33_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div
        class="hidden md:block fixed w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[110px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out"
        :style="{ left: `${mouseX}px`, top: `${mouseY}px` }"
      ></div>
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
    </div>

    <!-- الشريط العلوي الزجاجي -->
    <header class="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-xl transition-all">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- الشعار واسم المؤسسة -->
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <span v-if="siteSettings.logo && siteSettings.logo !== '🌱'" class="text-xl">{{ siteSettings.logo }}</span>
              <Leaf v-else class="w-6 h-6" />
            </div>
            <div>
              <span class="block text-lg sm:text-xl font-bold bg-gradient-to-l from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent">
                {{ siteSettings.companyName }}
              </span>
              <span class="block text-[11px] text-slate-400">نحو مستقبل أكثر استدامة</span>
            </div>
          </NuxtLink>

          <!-- روابط التنقل -->
          <nav class="hidden lg:flex items-center gap-1">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
              active-class="!bg-emerald-500/15 !text-emerald-400 border border-emerald-500/25 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
            >
              <component :is="link.icon" class="w-4 h-4" />
              <span>{{ link.name }}</span>
            </NuxtLink>
          </nav>

          <!-- زر لوحة التحكم + قائمة الجوال -->
          <div class="flex items-center gap-3">
            <NuxtLink
              to="/admin"
              class="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all active:scale-95 group"
            >
              <Settings class="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
              <span>لوحة التحكم</span>
            </NuxtLink>

            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="القائمة"
            >
              <X v-if="mobileMenuOpen" class="w-5 h-5" />
              <Menu v-else class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- قائمة الجوال -->
      <div v-if="mobileMenuOpen" class="lg:hidden border-t border-slate-800 bg-slate-900/95 backdrop-blur-xl px-4 py-4 space-y-1.5">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          @click="mobileMenuOpen = false"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          active-class="!bg-emerald-500/15 !text-emerald-400"
        >
          <component :is="link.icon" class="w-4 h-4" />
          <span>{{ link.name }}</span>
        </NuxtLink>
      </div>
    </header>

    <!-- المحتوى الرئيسي -->
    <main class="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <slot />
    </main>

    <!-- أزرار عائمة ذكية (واتساب + صعود للأعلى) -->
    <div class="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 flex items-center justify-center shadow-xl backdrop-blur-md transition-all hover:-translate-y-1"
        title="العودة للأعلى"
      >
        <ArrowUp class="w-5 h-5" />
      </button>

      <NuxtLink
        to="/contact"
        class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-110 transition-all"
        title="تواصل معنا مباشرة"
      >
        <MessageCircle class="w-6 h-6" />
      </NuxtLink>
    </div>

    <!-- الفوتر -->
    <footer class="relative z-10 border-t border-slate-800/80 bg-slate-900/50 backdrop-blur-md mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8 border-b border-slate-800/80">
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Leaf class="w-5 h-5" />
              </div>
              <span class="text-lg font-bold text-white">{{ siteSettings.companyName }}</span>
            </div>
            <p class="text-sm text-slate-400 leading-relaxed">{{ siteSettings.tagline }}</p>
          </div>

          <div>
            <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-4">روابط سريعة</h3>
            <ul class="grid grid-cols-2 gap-2.5 text-sm text-slate-400">
              <li v-for="link in navLinks" :key="link.path">
                <NuxtLink :to="link.path" class="hover:text-emerald-400 transition-colors">{{ link.name }}</NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-4">تواصل معنا</h3>
            <ul class="space-y-3 text-sm text-slate-400">
              <li class="flex items-center gap-2.5">
                <Phone class="w-4 h-4 text-emerald-400 shrink-0" />
                <span dir="ltr">{{ siteSettings.phone }}</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Mail class="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{{ siteSettings.email }}</span>
              </li>
              <li class="flex items-center gap-2.5">
                <MapPin class="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{{ siteSettings.address }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>جميع الحقوق محفوظة © 2026 {{ siteSettings.companyName }}</p>
          <p>نحو تنمية مستدامة ورؤية طموحة</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
body {
  font-family: 'IBM Plex Sans Arabic', system-ui, -apple-system, sans-serif;
  background-color: #020617;
  margin: 0;
}
</style>