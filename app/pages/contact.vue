<script setup lang="ts">
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '~/utils/firebase'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-vue-next'

const siteSettings = useState<any>('siteSettings')

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const sending = ref(false)
const sentSuccess = ref(false)

const submitMessage = async () => {
  if (!form.name || !form.email || !form.message) return
  sending.value = true
  try {
    await addDoc(collection(db, 'messages'), {
      name: form.name,
      email: form.email,
      subject: form.subject || 'استفسار عام',
      message: form.message,
      createdAt: serverTimestamp(),
      date: new Date().toLocaleDateString('ar-SA')
    })
    sentSuccess.value = true
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (err) {
    alert('حدث خطأ أثناء الإرسال، تأكد من الاتصال بالإنترنت.')
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div class="space-y-12">
    <div class="text-center max-w-3xl mx-auto">
      <span class="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
        نحن هنا لمساعدتك
      </span>
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-4">التواصل والدعم</h1>
      <p class="text-slate-400 text-base sm:text-lg leading-relaxed">
        يسعدنا استقبال استفساراتكم ومقترحاتكم وطلبات الدعم الفني عبر النموذج أدناه أو قنوات التواصل المباشرة.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- بطاقة معلومات التواصل -->
      <div class="rounded-3xl bg-slate-900/70 border border-slate-800 p-8 space-y-6 h-fit">
        <h2 class="text-xl font-bold text-white">معلومات التواصل</h2>
        <div class="space-y-5 text-sm">
          <div class="flex items-start gap-4">
            <div class="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Phone class="w-5 h-5" />
            </div>
            <div>
              <div class="text-slate-400 text-xs mb-1">الرقم الموحد</div>
              <div class="text-white font-semibold" dir="ltr">{{ siteSettings?.phone }}</div>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Mail class="w-5 h-5" />
            </div>
            <div>
              <div class="text-slate-400 text-xs mb-1">البريد الإلكتروني</div>
              <div class="text-white font-semibold">{{ siteSettings?.email }}</div>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <MapPin class="w-5 h-5" />
            </div>
            <div>
              <div class="text-slate-400 text-xs mb-1">المقر الرئيسي</div>
              <div class="text-white font-semibold">{{ siteSettings?.address }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- نموذج الإرسال -->
      <div class="lg:col-span-2 rounded-3xl bg-slate-900/70 border border-slate-800 p-8 sm:p-10">
        <div v-if="sentSuccess" class="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-6 text-center space-y-3 mb-6">
          <CheckCircle2 class="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 class="text-lg font-bold text-white">تم إرسال رسالتك بنجاح!</h3>
          <p class="text-sm text-slate-300">شكراً لتواصلك معنا، سيقوم فريق الدعم بمراجعة رسالتك والرد عليك في أقرب وقت.</p>
          <button @click="sentSuccess = false" class="text-xs text-emerald-400 underline">إرسال رسالة أخرى</button>
        </div>

        <form v-else @submit.prevent="submitMessage" class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">الاسم الكامل *</label>
              <input v-model="form.name" type="text" required placeholder="أدخل اسمك" class="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 px-4 py-3 text-white text-sm outline-none transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">البريد الإلكتروني *</label>
              <input v-model="form.email" type="email" required placeholder="name@example.com" class="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 px-4 py-3 text-white text-sm outline-none transition-colors" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">موضوع الرسالة</label>
            <input v-model="form.subject" type="text" placeholder="مثال: طلب خدمة / استفسار / دعم فني" class="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 px-4 py-3 text-white text-sm outline-none transition-colors" />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">تفاصيل الرسالة *</label>
            <textarea v-model="form.message" rows="5" required placeholder="اكتب رسالتك هنا..." class="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 px-4 py-3 text-white text-sm outline-none transition-colors"></textarea>
          </div>

          <button
            type="submit"
            :disabled="sending"
            class="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 transition-all disabled:opacity-50"
          >
            <Send class="w-4 h-4" />
            <span>{{ sending ? 'جاري الإرسال...' : 'إرسال الرسالة' }}</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>