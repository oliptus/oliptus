import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <section id="contact" className="py-24 bg-background">
            <Toaster
                position="bottom-center"
                toastOptions={{
                    style: {
                        background: '#fff',
                        color: '#000',
                        border: '1px solid #e5e5e5',
                        padding: '16px',
                        borderRadius: '4px',
                    },
                }}
            />
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl font-bold mb-4 text-foreground">{t('contact.title')}</h2>
                    <p className="text-lg text-muted-foreground">
                        {t('contact.subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <Mail className="w-6 h-6 text-foreground mt-1" />
                            <div>
                                <h3 className="font-semibold text-foreground">{t('contact.info.email.title')}</h3>
                                <p className="text-muted-foreground text-sm">hello@oliptus.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="w-6 h-6 text-foreground mt-1" />
                            <div>
                                <h3 className="font-semibold text-foreground">{t('contact.info.phone.title')}</h3>
                                <p className="text-muted-foreground text-sm">+55 (11) 99999-9999</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-foreground mt-1" />
                            <div>
                                <h3 className="font-semibold text-foreground">{t('contact.info.visit.title')}</h3>
                                <p className="text-muted-foreground text-sm">{t('contact.info.visit.address_1')}</p>
                                <p className="text-muted-foreground text-sm">{t('contact.info.visit.address_2')}</p>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const data = Object.fromEntries(formData.entries());
                        const loadingToast = toast.loading('Sending...');

                        try {
                            const response = await fetch('http://localhost:3000/api/contact', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(data),
                            });
                            toast.dismiss(loadingToast);
                            if (response.ok) {
                                toast.success(t('contact.form.success') || 'Sent!');
                                e.target.reset();
                            } else {
                                toast.error(t('contact.form.error') || 'Error sending.');
                            }
                        } catch (error) {
                            toast.dismiss(loadingToast);
                            toast.error(t('contact.form.error') || 'Error sending.');
                        }
                    }}>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full px-4 py-3 rounded-md bg-secondary/30 border border-border text-foreground focus:ring-1 focus:ring-foreground outline-none transition-all placeholder:text-muted-foreground/50"
                            placeholder={t('contact.form.name_placeholder')}
                        />
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 rounded-md bg-secondary/30 border border-border text-foreground focus:ring-1 focus:ring-foreground outline-none transition-all placeholder:text-muted-foreground/50"
                            placeholder={t('contact.form.email_placeholder')}
                        />
                        <textarea
                            name="message"
                            required
                            rows="4"
                            className="w-full px-4 py-3 rounded-md bg-secondary/30 border border-border text-foreground focus:ring-1 focus:ring-foreground outline-none transition-all placeholder:text-muted-foreground/50 resize-none"
                            placeholder={t('contact.form.message_placeholder')}
                        ></textarea>

                        <button
                            type="submit"
                            className="w-full bg-foreground text-background py-3 rounded-md font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
                        >
                            {t('contact.form.submit')}
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
