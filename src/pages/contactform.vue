<template>
    <form
  @submit.prevent="handleSubmit"
  class="grid md:grid-cols-2 gap-6 mt-10"
>
  <input
    v-model="form.name"
    type="text"
    placeholder="Your Name"
    required
    class="col-span-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-indigo-500 focus:outline-none"
  />

  <input
    v-model="form.email"
    type="email"
    placeholder="Email Address"
    required
    class="col-span-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-indigo-500 focus:outline-none"
  />

  <textarea
    v-model="form.message"
    placeholder="Tell us about your project..."
    rows="4"
    class="col-span-2 bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-indigo-500 focus:outline-none"
  ></textarea>

  <button
    type="submit"
    class="col-span-2 bg-indigo-500 hover:bg-indigo-600 rounded-full py-4 font-semibold transition"
  >
    Send Message
  </button>
</form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    }
  },

</script>