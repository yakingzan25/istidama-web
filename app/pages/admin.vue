<script setup lang="ts">
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import {
  doc,
  setDoc,
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore'
import { auth, db } from '~/utils/firebase'
import {
  Lock,
  LogOut,
  Settings,
  Briefcase,
  Handshake,
  Newspaper,
  Mail,
  Plus,
  Trash2,
  Save,
  CheckCircle2
} from 'lucide-vue-next'

// حالة تسجيل الدخول
const user = ref<any>(null)
const authLoading = ref(true)
const email = ref('admin@istidama.com')
const password = ref('')
const loginError = ref('')
const loggingIn = ref(false)

// التبويب النشط في لوحة التحكم
const activeTab = ref<'general' | 'services' | 'partners' | 'news' | 'messages'>('general')

// 1. الإعدادات العامة والهوية
const siteSettings = useState<any>('siteSettings')
const settingsForm = reactive({
  companyName: '',
  logo: '',
  tagline: '',
  aboutText: '',
  vision: '',
  mission: '',
  phone: '',
  email: '',
  address: ''
})
const savingSettings = ref(false)
const settingsSavedMsg = ref(false)

// 2. قوائم البيانات
const services = ref<any[]>([])
const partners = ref<any[]>([])
const newsList = ref<any[]>([])
const messages = ref<any[]>([])

// نماذج الإضافة الجديدة
const newService = reactive({ title: '', description: '', icon: '⚡' })
const newPartner = reactive({ name: '', description: '', logo: '🏢', website: '' })
const newNews = reactive({ title: '', content: '', date: new Date().toLocaleDateString('ar-SA') })

onMounted(() => {
  // متابعة حالة تسجيل دخول المدير
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
    authLoading.value = false
    if (currentUser && siteSettings.value) {
      Object.assign(settingsForm, siteSettings.value)
    }
  })

  // جلب البيانات لحظياً
  onSnapshot(collection(db, 'services'), (s) => {
    services.value = s.docs.map(d => ({ id: d.id, ...d.data() }))
  })
  onSnapshot(collection(db, 'partners'), (s) => {
    partners.value = s.docs.map(d => ({ id: d.id, ...d.data() }))
  })
  onSnapshot(collection(db, 'news'), (s) => {
    newsList.value = s.docs.map(d => ({ id: d.id, ...d.data() }))
  })
  onSnapshot(collection(db, 'messages'), (s) => {
    messages.value = s.docs.map(d => ({ id: d.id, ...d.data() }))
  })
})

watch(siteSettings, (val) => {
  if (val) Object.assign(settingsForm, val)
}, { immediate: true })

// تسجيل الدخول
const handleLogin = async () => {
  loginError.value = ''
  loggingIn.value = true
  try {
    await signInWithEmailAndPassword(auth, email.value.trim(), password.value)
  } catch (err: any) {
    console.error('Firebase Login Error:', err)
    loginError.value = `خطأ (${err.code}): ${err.message}`
  } finally {
    loggingIn.value = false
  }
}

const handleLogout = async () => {
  await signOut(auth)
}

// حفظ الإعدادات العامة والهوية
const saveSettings = async () => {
  savingSettings.value = true
  try {
    await setDoc(doc(db, 'settings', 'general'), { ...settingsForm }, { merge: true })
    settingsSavedMsg.value = true
    setTimeout(() => (settingsSavedMsg.value = false), 3000)
  } catch (err) {
    alert('حدث خطأ أثناء الحفظ')
  } finally {
    savingSettings.value = false
  }
}

// إضافة وحذف خدمة
const addService = async () => {
  if (!newService.title || !newService.description) return
  await addDoc(collection(db, 'services'), { ...newService, createdAt: serverTimestamp() })
  newService.title = ''
  newService.description = ''
  newService.icon = '⚡'
}
const deleteItem = async (colName: string, id: string) => {
  await deleteDoc(doc(db, colName, id))
}

// إضافة شريك
const addPartner = async () => {
  if (!newPartner.name) return
  await addDoc(collection(db, 'partners'), { ...newPartner, createdAt: serverTimestamp() })
  newPartner.name = ''
  newPartner.description = ''
  newPartner.logo = '🏢'
  newPartner.website = ''
}

// إضافة خبر
const addNews = async () => {
  if (!newNews.title || !newNews.content) return
  await addDoc(collection(db, 'news'), { ...newNews, createdAt: serverTimestamp() })
  newNews.title = ''
  newNews.content = ''
}

const tabs = [
  { id: 'general', label: 'الهوية والإعدادات العامة', icon: Settings },
  { id: 'services', label: 'إدارة الخدمات', icon: Briefcase },
  { id: 'partners', label: 'إدارة الشركاء', icon: Handshake },
  { id: 'news', label: 'إدارة الأخبار', icon: Newspaper },
  { id: 'messages', label: 'رسائل التواصل', icon: Mail }
] as const
</script>

<template>
  <div>
    <!-- حالة التحميل -->
    <div v-if="authLoading" class="text-center py-20 text-slate-400">
      جاري التحقق من الصلاحيات...
    </div>

    <!-- شاشة تسجيل الدخول للمدير -->
    <div v-else-if="!user" class="max-w-md mx-auto my-10">
      <div class="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 sm:p-10 shadow-2xl">
        <div class="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mx-auto mb-6">
          <Lock class="w-7 h-7" />
        </div>
        <h1 class="text-2xl font-bold text-white text-center mb-2">دخول لوحة التحكم</h1>
        <p class="text-slate-400 text-sm text-center mb-8">مخصصة لمدير النظام فقط للتحكم بإعدادات ومحتوى الموقع</p>

        <div v-if="loginError" class="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center">
          {{ loginError }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-2">البريد الإلكتروني</label>
            <input v-model="email" type="email" required class="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 px-4 py-3 text-white text-sm outline-none" dir="ltr" />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-2">كلمة المرور</label>
            <input v-model="password" type="password" required placeholder="••••••••" class="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 px-4 py-3 text-white text-sm outline-none" dir="ltr" />
          </div>
          <button
            type="submit"
            :disabled="loggingIn"
            class="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 transition-all disabled:opacity-50"
          >
            {{ loggingIn ? 'جاري الدخول...' : 'تسجيل الدخول' }}
          </button>
        </form>
      </div>
    </div>

    <!-- واجهة لوحة التحكم بعد تسجيل الدخول -->
    <div v-else class="space-y-8">
      <!-- شريط الترحيب وتسجيل الخروج -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-slate-900/80 border border-slate-800 p-6">
        <div>
          <h1 class="text-2xl font-bold text-white">لوحة التحكم الإدارية</h1>
          <p class="text-xs text-slate-400 mt-1">مرحباً بك ({{ user.email }}) — أي تعديل هنا ينعكس فوراً على الموقع</p>
        </div>
        <button
          @click="handleLogout"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors self-start sm:self-auto"
        >
          <LogOut class="w-4 h-4" />
          <span>تسجيل الخروج</span>
        </button>
      </div>

      <!-- أزرار التنقل بين الأقسام -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          :class="activeTab === tab.id ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'"
        >
          <component :is="tab.icon" class="w-4 h-4" />
          <span>{{ tab.label }}</span>
          <span v-if="tab.id === 'messages' && messages.length > 0" class="px-2 py-0.5 text-xs rounded-full bg-slate-950 text-emerald-400">
            {{ messages.length }}
          </span>
        </button>
      </div>

      <!-- 1. تبويب الهوية والإعدادات العامة -->
      <div v-if="activeTab === 'general'" class="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-white">التحكم باسم الشركة والشعار والصفحات التعريفية</h2>
          <span v-if="settingsSavedMsg" class="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full">
            <CheckCircle2 class="w-4 h-4" />
            <span>تم الحفظ والتحديث في الموقع!</span>
          </span>
        </div>

        <form @submit.prevent="saveSettings" class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div class="sm:col-span-2">
              <label class="block text-xs font-medium text-slate-300 mb-2">اسم الشركة / المؤسسة</label>
              <input v-model="settingsForm.companyName" type="text" class="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 px-4 py-3 text-white text-sm outline-none" />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-2">رمز الشعار (إيموجي أو نص)</label>
              <input v-model="settingsForm.logo" type="text" class="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 px-4 py-3 text-white text-sm outline-none" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-2">العبارة الترحيبية المختصرة (Tagline)</label>
            <input v-model="settingsForm.tagline" type="text" class="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 px-4 py-3 text-white text-sm outline-none" />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-2">نبذة عن الشركة (تظهر في الرئيسية وصفحة من نحن)</label>
            <textarea v-model="settingsForm.aboutText" rows="3" class="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 px-4 py-3 text-white text-sm outline-none"></textarea>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-2">رؤية الشركة</label>
              <textarea v-model="settingsForm.vision" rows="2" class="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 px-4 py-3 text-white text-sm outline-none"></textarea>
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-2">رسالة الشركة</label>
              <textarea v-model="settingsForm.mission" rows="2" class="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 px-4 py-3 text-white text-sm outline-none"></textarea>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2 border-t border-slate-800">
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-2">رقم الهاتف</label>
              <input v-model="settingsForm.phone" type="text" class="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 px-4 py-3 text-white text-sm outline-none" />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-2">البريد الإلكتروني</label>
              <input v-model="settingsForm.email" type="text" class="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 px-4 py-3 text-white text-sm outline-none" />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-2">العنوان</label>
              <input v-model="settingsForm.address" type="text" class="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 px-4 py-3 text-white text-sm outline-none" />
            </div>
          </div>

          <button
            type="submit"
            :disabled="savingSettings"
            class="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 transition-all"
          >
            <Save class="w-4 h-4" />
            <span>{{ savingSettings ? 'جاري الحفظ...' : 'حفظ جميع التعديلات' }}</span>
          </button>
        </form>
      </div>

      <!-- 2. تبويب إدارة الخدمات -->
      <div v-if="activeTab === 'services'" class="space-y-6">
        <form @submit.prevent="addService" class="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 space-y-4">
          <h2 class="text-lg font-bold text-white">إضافة خدمة جديدة</h2>
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <input v-model="newService.title" type="text" required placeholder="عنوان الخدمة" class="sm:col-span-3 rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-white text-sm outline-none" />
            <input v-model="newService.icon" type="text" placeholder="أيقونة (مثال: 🌱)" class="rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-white text-sm outline-none" />
          </div>
          <textarea v-model="newService.description" rows="2" required placeholder="وصف الخدمة بالتفصيل..." class="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-white text-sm outline-none"></textarea>
          <button type="submit" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 text-sm">
            <Plus class="w-4 h-4" />
            <span>إضافة الخدمة</span>
          </button>
        </form>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="srv in services" :key="srv.id" class="flex items-start justify-between gap-4 rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
            <div>
              <h3 class="font-bold text-white">{{ srv.icon }} {{ srv.title }}</h3>
              <p class="text-xs text-slate-400 mt-1">{{ srv.description }}</p>
            </div>
            <button @click="deleteItem('services', srv.id)" class="p-2 rounded-lg text-red-400 hover:bg-red-500/10" title="حذف">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- 3. تبويب إدارة الشركاء -->
      <div v-if="activeTab === 'partners'" class="space-y-6">
        <form @submit.prevent="addPartner" class="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 space-y-4">
          <h2 class="text-lg font-bold text-white">إضافة شريك نجاح جديد</h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input v-model="newPartner.name" type="text" required placeholder="اسم الجهة / الشريك" class="rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-white text-sm outline-none" />
            <input v-model="newPartner.logo" type="text" placeholder="رمز الشعار (مثال: 🏛️)" class="rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-white text-sm outline-none" />
            <input v-model="newPartner.website" type="url" placeholder="رابط الموقع (اختياري)" class="rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-white text-sm outline-none" dir="ltr" />
          </div>
          <input v-model="newPartner.description" type="text" placeholder="نبذة مختصرة عن الشراكة" class="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-white text-sm outline-none" />
          <button type="submit" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 text-sm">
            <Plus class="w-4 h-4" />
            <span>إضافة الشريك</span>
          </button>
        </form>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="p in partners" :key="p.id" class="flex items-start justify-between gap-4 rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
            <div>
              <h3 class="font-bold text-white">{{ p.logo }} {{ p.name }}</h3>
              <p class="text-xs text-slate-400 mt-1">{{ p.description }}</p>
            </div>
            <button @click="deleteItem('partners', p.id)" class="p-2 rounded-lg text-red-400 hover:bg-red-500/10" title="حذف">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- 4. تبويب إدارة الأخبار -->
      <div v-if="activeTab === 'news'" class="space-y-6">
        <form @submit.prevent="addNews" class="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 space-y-4">
          <h2 class="text-lg font-bold text-white">نشر خبر جديد</h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input v-model="newNews.title" type="text" required placeholder="عنوان الخبر" class="sm:col-span-2 rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-white text-sm outline-none" />
            <input v-model="newNews.date" type="text" placeholder="التاريخ" class="rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-white text-sm outline-none" />
          </div>
          <textarea v-model="newNews.content" rows="3" required placeholder="تفاصيل الخبر..." class="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-white text-sm outline-none"></textarea>
          <button type="submit" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 text-sm">
            <Plus class="w-4 h-4" />
            <span>نشر الخبر</span>
          </button>
        </form>

        <div class="space-y-3">
          <div v-for="n in newsList" :key="n.id" class="flex items-start justify-between gap-4 rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
            <div>
              <span class="text-xs text-emerald-400">{{ n.date }}</span>
              <h3 class="font-bold text-white mt-0.5">{{ n.title }}</h3>
              <p class="text-xs text-slate-400 mt-1">{{ n.content }}</p>
            </div>
            <button @click="deleteItem('news', n.id)" class="p-2 rounded-lg text-red-400 hover:bg-red-500/10" title="حذف">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- 5. تبويب رسائل التواصل والدعم -->
      <div v-if="activeTab === 'messages'" class="space-y-4">
        <h2 class="text-lg font-bold text-white">الرسائل الواردة من الزوار ({{ messages.length }})</h2>
        <div v-if="messages.length === 0" class="rounded-2xl border border-dashed border-slate-800 p-10 text-center text-slate-400 text-sm">
          لا توجد رسائل واردة حالياً.
        </div>
        <div v-for="msg in messages" :key="msg.id" class="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 flex items-start justify-between gap-4">
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-3">
              <span class="font-bold text-white">{{ msg.name }}</span>
              <span class="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">{{ msg.email }}</span>
              <span class="text-xs text-slate-500">{{ msg.date }}</span>
            </div>
            <div class="text-sm font-semibold text-slate-200">الموضوع: {{ msg.subject }}</div>
            <p class="text-sm text-slate-400 leading-relaxed">{{ msg.message }}</p>
          </div>
          <button @click="deleteItem('messages', msg.id)" class="p-2 rounded-lg text-red-400 hover:bg-red-500/10 shrink-0" title="حذف الرسالة">
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>