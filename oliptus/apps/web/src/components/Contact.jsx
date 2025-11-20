import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <section id="contact" className="py-24 bg-[var(--dark-bg)] relative overflow-hidden">
            <Toaster
                position="bottom-center"
                containerStyle={{
                    bottom: 40,
                }}
                toastOptions={{
                    style: {
                        background: '#333',
                        color: '#fff',
                        padding: '16px',
                        borderRadius: '8px',
                        maxWidth: '500px',
                    },
                    success: {
                        iconTheme: {
                            primary: '#FF6B00',
                            secondary: '#fff',
                        },
                    },
                }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t('contact.title')}</h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        {t('contact.subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0 text-[var(--primary-orange)]">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1 text-white">{t('contact.info.email.title')}</h3>
                                    <p className="text-gray-400">hello@oliptus.com</p>
                                    <p className="text-gray-400">support@oliptus.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0 text-[var(--primary-orange)]">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1 text-white">{t('contact.info.phone.title')}</h3>
                                    <p className="text-gray-400">+55 (11) 99999-9999</p>
                                    <p className="text-gray-400">Mon - Fri, 9am - 6pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0 text-[var(--primary-orange)]">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1 text-white">{t('contact.info.visit.title')}</h3>
                                    <p className="text-gray-400">{t('contact.info.visit.address_1')}</p>
                                    <p className="text-gray-400">{t('contact.info.visit.address_2')}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-[var(--card-bg)] p-8 rounded-2xl border border-white/5"
                    >
                        <form className="space-y-6" onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const data = Object.fromEntries(formData.entries());

                            const loadingToast = toast.loading('Sending message...');

                            try {
                                const response = await fetch('http://localhost:3000/api/contact', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(data),
                                });

                                toast.dismiss(loadingToast);

                                if (response.ok) {
                                    toast.success(t('contact.form.success') || 'Message sent successfully!');
                                    e.target.reset();
                                } else {
                                    toast.error(t('contact.form.error') || 'Failed to send message.');
                                }
                            } catch (error) {
                                toast.dismiss(loadingToast);
                                console.error('Error sending message:', error);
                                toast.error(t('contact.form.error') || 'Failed to send message.');
                            }
                        }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact.form.name')}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-[#222] border border-gray-800 text-white focus:border-[var(--primary-orange)] focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                                        placeholder={t('contact.form.name_placeholder')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact.form.email')}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-[#222] border border-gray-800 text-white focus:border-[var(--primary-orange)] focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                                        placeholder={t('contact.form.email_placeholder')}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact.form.subject')}</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-[#222] border border-gray-800 text-white focus:border-[var(--primary-orange)] focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                                    placeholder={t('contact.form.subject_placeholder')}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact.form.message')}</label>
                                <textarea
                                    name="message"
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg bg-[#222] border border-gray-800 text-white focus:border-[var(--primary-orange)] focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none"
                                    placeholder={t('contact.form.message_placeholder')}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[var(--primary-orange)] text-white py-4 rounded-lg font-semibold hover:bg-[var(--secondary-orange)] transition-colors flex items-center justify-center gap-2"
                            >
                                {t('contact.form.submit')}
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
