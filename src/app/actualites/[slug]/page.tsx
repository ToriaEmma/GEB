"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';
import {
    Heart,
    ArrowLeft,
    LinkedinLogo,
    WhatsappLogo,
    TwitterLogo,
    ChatCircle,
    ArrowBendDownRight,
    Clock,
    Check,
    Warning,
} from '@phosphor-icons/react';
import { articles, formatDate } from '../data';
import { useLanguage } from '@/context/LanguageContext';
import { articleService, Article } from '@/lib/services/articles';
import { articleDetailService } from '@/lib/services/articleDetail';
import { commentService, Comment as DbComment } from '@/lib/services/comments';

interface Comment {
    id: string;
    name: string;
    content: string;
    date: string;
    status: 'pending' | 'approved';
    replies: Comment[];
}

function CommentItem({ comment, onReply, depth = 0 }: { comment: Comment; onReply: (parentId: string) => void; depth?: number }) {
    const { t } = useLanguage();
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${depth > 0 ? 'ml-8 border-l-2 border-gray-100 pl-6' : ''}`}
        >
            <div className="bg-transparent pb-5 mb-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#111c2f] flex items-center justify-center text-[white] font-black text-sm flex-shrink-0">
                            {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="font-black text-[11px] uppercase tracking-widest text-[#111c2f]">{comment.name}</p>
                            <p className="text-[9px] text-[#111c2f]/50 font-black uppercase tracking-widest">{comment.date}</p>
                        </div>
                    </div>
                    {comment.status === 'pending' && (
                        <span className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-amber-700 bg-amber-100/50 px-2.5 py-1 flex-shrink-0">
                            <Warning size={10} weight="fill" />
                            {t('en_attente')}
                        </span>
                    )}
                    {comment.status === 'approved' && (
                        <span className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-[#111c2f] bg-[#111c2f]/10 px-2.5 py-1 flex-shrink-0">
                            <Check size={10} weight="bold" />
                            {t('publie')}
                        </span>
                    )}
                </div>
                <p className="text-sm text-[#111c2f]/80 leading-relaxed font-medium">{comment.content}</p>
                {depth < 2 && (
                    <button
                        onClick={() => onReply(comment.id)}
                        className="flex items-center gap-1.5 mt-3 text-[9px] font-black uppercase tracking-widest text-[#4471c4] hover:text-[#111c2f] transition-colors"
                    >
                        <ArrowBendDownRight size={12} weight="bold" />
                        {t('repondre')}
                    </button>
                )}
            </div>
            {/* Replies */}
            {comment.replies.length > 0 && (
                <div className="mt-4 space-y-4">
                    {comment.replies.map(reply => (
                        <CommentItem key={reply.id} comment={reply} onReply={onReply} depth={depth + 1} />
                    ))}
                </div>
            )}
        </motion.div>
    );
}

function CommentForm({ onSubmit, parentId, onCancel }: {
    onSubmit: (name: string, content: string, parentId?: string) => void;
    parentId?: string;
    onCancel?: () => void;
}) {
    const { t } = useLanguage();
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !content.trim()) return;
        onSubmit(name, content, parentId);
        setName('');
        setContent('');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {submitted ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center"
                >
                    <Check size={24} weight="bold" className="text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm font-black text-emerald-700">{t('commentaire_soumis')}</p>
                    <p className="text-xs text-emerald-600 mt-1">{t('invisible_validation')}</p>
                </motion.div>
            ) : (
                <>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={t('votre_nom')}
                        required
                        className="w-full border-b border-[#111c2f]/20 py-3 text-sm font-medium focus:outline-none focus:border-[#111c2f] transition-colors text-[#111c2f] placeholder:text-[#111c2f]/40 bg-transparent"
                    />
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder={parentId ? t('votre_reponse') : t('votre_commentaire')}
                        required
                        rows={3}
                        className="w-full border-b border-[#111c2f]/20 py-3 text-sm font-medium focus:outline-none focus:border-[#111c2f] transition-colors text-[#111c2f] placeholder:text-[#111c2f]/40 bg-transparent resize-none"
                    />
                    <p className="text-[9px] text-[#111c2f]/50 font-black uppercase tracking-widest mt-2">
                        {t('validation_notice')}
                    </p>
                    <div className="flex gap-3 mt-6">
                        <button
                            type="submit"
                            className="bg-[#111c2f] text-[white] px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#4471c4] transition-colors"
                        >
                            {t('envoyer')}
                        </button>
                        {onCancel && (
                            <button
                                type="button"
                                onClick={onCancel}
                                className="text-[#111c2f]/50 text-[10px] px-4 rounded-full font-black uppercase tracking-widest hover:text-[#111c2f] transition-colors"
                            >
                                {t('annuler')}
                            </button>
                        )}
                    </div>
                </>
            )}
        </form>
    );
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { t, language } = useLanguage();
    const { slug } = use(params);
    const [dbArticle, setDbArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [comments, setComments] = useState<Comment[]>([]);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const localFormatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString(language === 'FR' ? 'fr-FR' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data = await articleDetailService.getBySlug(slug);
                setDbArticle(data);
                setLikeCount(data.likes || 0);

                // Fetch comments for this article
                if (data.id) {
                    const dbComments = await commentService.getByArticle(data.id);
                    
                    // Create a map for easy access
                    const commentMap: Record<string, Comment> = {};
                    dbComments.forEach(c => {
                        commentMap[c.id!] = {
                            id: c.id!,
                            name: c.name,
                            content: c.content,
                            date: localFormatDate(c.created_at!),
                            status: c.status as 'pending' | 'approved',
                            replies: []
                        };
                    });

                    // Build the tree
                    const rootComments: Comment[] = [];
                    dbComments.forEach(c => {
                        if (c.parent_id && commentMap[c.parent_id]) {
                            commentMap[c.parent_id].replies.push(commentMap[c.id!]);
                        } else {
                            rootComments.push(commentMap[c.id!]);
                        }
                    });

                    setComments(rootComments);
                }
            } catch (err) {
                console.error("Error fetching article detail:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [slug]);

    useEffect(() => {
        if (typeof window !== 'undefined' && dbArticle) {
            const savedLike = localStorage.getItem(`like-${dbArticle.slug}`);
            if (savedLike === 'true') {
                setLiked(true);
            }
        }
    }, [dbArticle]);

    if (loading) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#111c2f] border-t-transparent rounded-full animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111c2f]">{language === 'FR' ? 'Chargement de l\'article...' : 'Loading article...'}</p>
                </div>
            </main>
        );
    }

    if (!dbArticle) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl font-heading font-black text-[#111c2f]">{t('article_introuvable')}</p>
                    <Link href="/actualites" className="mt-4 inline-block text-[#4471c4] font-black uppercase text-xs tracking-widest">
                        ← {t('retour_aux_actualites')}
                    </Link>
                </div>
            </main>
        );
    }


    const handleLike = async () => {
        if (!dbArticle?.id) return;
        
        const newLiked = !liked;
        let newCount = newLiked ? (likeCount + 1) : (likeCount - 1);
        newCount = Math.max(0, newCount); // Sécurité : jamais en dessous de 0
        
        setLiked(newLiked);
        setLikeCount(newCount);
        localStorage.setItem(`like-${dbArticle.slug}`, String(newLiked));

        try {
            await articleService.update(dbArticle.id, { likes: newCount });
        } catch (err) {
            console.error("Error updating likes in DB:", err);
        }
    };

    const handleAddComment = async (name: string, content: string, parentId?: string) => {
        if (!dbArticle?.id) return;

        try {
            const newComment = await commentService.create({
                article_id: dbArticle.id,
                parent_id: parentId,
                name,
                content,
                status: 'pending'
            });

            const localComment: Comment = {
                id: newComment.id!,
                name: newComment.name,
                content: newComment.content,
                date: localFormatDate(new Date().toISOString()),
                status: 'pending',
                replies: [],
            };

            if (parentId) {
                setComments(prev => prev.map(c => {
                    if (c.id === parentId) return { ...c, replies: [...c.replies, localComment] };
                    return { ...c, replies: c.replies.map(r => r.id === parentId ? { ...r, replies: [...r.replies, localComment] } : r) };
                }));
            } else {
                setComments(prev => [...prev, localComment]);
            }
            setReplyingTo(null);
        } catch (err) {
            console.error("Error adding comment:", err);
            alert("Erreur lors de l'envoi du commentaire.");
        }
    };

    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = encodeURIComponent(language === 'FR' ? dbArticle.title_fr : dbArticle.title_en);
    const shareUrl = encodeURIComponent(pageUrl);

    const handleCopy = () => {
        navigator.clipboard.writeText(pageUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const relatedArticles = articles.filter(a => a.slug !== dbArticle.slug && a.category === dbArticle.category).slice(0, 2);

    return (
        <main className="min-h-screen bg-[white] text-[#111c2f] selection:bg-[#4471c4] selection:text-white pt-32 pb-20">
            {/* Top Navbar Area */}
            <div className="flex justify-between items-start pt-8 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
                <div className="w-12 h-12 bg-[#111c2f] flex items-center justify-center text-white font-black text-xs">
                    BEG
                </div>
                <div className="max-w-[280px] text-left hidden md:block">
                    <p className="text-[11px] leading-tight font-medium tracking-wide text-[#111c2f]">
                        {language === 'FR' 
                            ? "Notre engagement envers l'excellence garantit à nos clients un partenariat stratégique solide et proactif."
                            : "Our commitment to excellence guarantees our clients a solid and proactive strategic partnership."
                        }
                    </p>
                </div>
                <div>
                    <Link href="/actualites" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#111c2f] hover:text-[#4471c4] transition-colors">
                        <ArrowLeft size={16} weight="bold" />
                        {language === 'FR' ? "Retour aux actualités" : "Back to news"}
                    </Link>
                </div>
            </div>

            {/* Title Section */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 mt-24 mb-24 md:mb-40">
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-5xl md:text-7xl lg:text-[7rem] font-heading font-black uppercase tracking-tight leading-[1.1] text-[#111c2f] max-w-[1400px]"
                >
                    {language === 'FR' ? dbArticle.title_fr : dbArticle.title_en}
                </motion.h1>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mt-24 md:mt-40">
                    <div className="md:col-span-3 lg:col-span-4">
                        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#111c2f]">
                            <span className="w-2.5 h-2.5 bg-[#111c2f] block" />
                            {language === 'FR' ? "ÉTUDES DE CAS" : "CASE STUDIES"}
                        </span>
                    </div>
                    <div className="md:col-span-9 lg:col-span-8">
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="text-2xl md:text-4xl lg:text-[40px] font-medium leading-[1.3] text-[#111c2f] max-w-4xl"
                        >
                            {language === 'FR' ? dbArticle.excerpt_fr : dbArticle.excerpt_en}
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Grid Area: Image & Body */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
                    
                    {/* Left Column: Metadata & Image */}
                    <div className="md:col-span-4 lg:col-span-4">
                        <div className="grid grid-cols-3 gap-6 mb-12">
                            <div>
                                <p className="text-[8px] font-black uppercase tracking-widest text-[#111c2f]/40 mb-2">{t('categorie_label')}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#111c2f]">{dbArticle.category}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black uppercase tracking-widest text-[#111c2f]/40 mb-2">{t('auteur_label')}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#111c2f]">Business Dev #1</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black uppercase tracking-widest text-[#111c2f]/40 mb-2">DATE</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#111c2f]">{dbArticle.created_at ? localFormatDate(dbArticle.created_at) : ''}</p>
                            </div>
                        </div>

                        <div className="relative aspect-square w-full max-w-sm bg-gray-50 overflow-hidden grayscale contrast-[1.1] mix-blend-multiply rounded-[40px]">
                            {dbArticle.image_url ? (
                                <Image 
                                    src={dbArticle.image_url} 
                                    alt={language === 'FR' ? dbArticle.title_fr : dbArticle.title_en} 
                                    fill 
                                    className="object-cover" 
                                />
                            ) : (
                                <div className="absolute inset-0 bg-meb-accent/20" />
                            )}
                        </div>
                    </div>

                    {/* Right Column: Article Body */}
                    <div className="md:col-span-8 lg:col-span-8">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="columns-1 md:columns-2 gap-12 lg:gap-16 text-[#111c2f]"
                        >
                            {(language === 'FR' ? dbArticle.content_fr : dbArticle.content_en).trim().split('\n').map((line, i) => {
                                if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-heading font-black mt-8 mb-4 break-inside-avoid">{line.slice(3)}</h2>;
                                if (line.startsWith('### ')) return <h3 key={i} className="text-base font-heading font-black mt-6 mb-3 break-inside-avoid">{line.slice(4)}</h3>;
                                if (line.startsWith('> ')) return <blockquote key={i} className="pl-4 py-1 my-6 border-l-2 border-[#111c2f] text-sm font-medium italic break-inside-avoid">{line.slice(2)}</blockquote>;
                                if (line.startsWith('- ')) return <li key={i} className="text-sm leading-[1.8] ml-4 list-none relative before:content-[''] before:w-1 before:h-1 before:bg-[#111c2f] before:absolute before:-left-4 before:top-2.5 mb-2">{line.slice(2).replace(/\*\*(.*?)\*\*/g, '$1')}</li>;
                                if (line.match(/^\d+\. /)) return <li key={i} className="text-sm leading-[1.8] ml-4 list-decimal mb-2 font-medium">{line.replace(/^\d+\. /, '').replace(/\*\*(.*?)\*\*/g, '$1')}</li>;
                                if (line.trim() === '') return <div key={i} className="h-4" />;
                                return <p key={i} className="text-sm leading-[1.8] mb-4 font-medium">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
                            })}
                        </motion.div>
                        
                        <div className="mt-16">
                            <Link 
                                href="/actualites" 
                                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#111c2f]/20 text-[10px] font-black uppercase tracking-widest text-[#111c2f] hover:bg-[#111c2f] hover:text-white transition-all"
                            >
                                <ArrowLeft size={14} weight="bold" />
                                {language === 'FR' ? "Retour aux actualités" : "Back to news"}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
                <div className="w-full h-px bg-[#111c2f]/10 mb-16" />
            </div>

            {/* Engagement & Comments */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                <div className="lg:col-span-4">
                    {/* Like + Share Bar */}
                    <div className="mb-16">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 font-black text-[10px] uppercase tracking-widest transition-all w-full justify-center mb-6 ${
                                liked
                                    ? 'bg-[#111c2f] border-[#111c2f] text-[white]'
                                    : 'border-[#111c2f] text-[#111c2f] hover:bg-[#111c2f] hover:text-[white]'
                            }`}
                        >
                            <Heart size={16} weight={liked ? 'fill' : 'regular'} />
                            <span>{likeCount} {t('jaime')}</span>
                        </button>

                        <div className="flex flex-col gap-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#111c2f]/50 mb-2">{language === 'FR' ? "Partager" : "Share"}</span>
                            <div className="flex items-center gap-3">
                                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#0077b5] text-[#0077b5] flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-colors">
                                    <LinkedinLogo size={16} weight="fill" />
                                </a>
                                <a href={`https://wa.me/?text=${shareText}%20${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#25D366] text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors">
                                    <WhatsappLogo size={16} weight="fill" />
                                </a>
                                <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#1DA1F2] text-[#1DA1F2] flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-colors">
                                    <TwitterLogo size={16} weight="fill" />
                                </a>
                                <button onClick={handleCopy} className="h-10 px-4 rounded-full border border-[#111c2f] text-[10px] font-black uppercase tracking-widest text-[#111c2f] hover:bg-[#111c2f] hover:text-[white] transition-colors flex items-center gap-2">
                                    {copied ? <Check size={12} weight="bold" /> : t('copier')}
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Related Articles in left column */}
                    {relatedArticles.length > 0 && (
                        <div>
                            <h2 className="text-[10px] font-black text-[#111c2f]/50 uppercase tracking-widest mb-6">{t('articles_similaires')}</h2>
                            <div className="flex flex-col gap-6">
                                {relatedArticles.map(rel => (
                                    <Link key={rel.slug} href={`/actualites/${rel.slug}`} className="group block border-b border-[#111c2f]/10 pb-6">
                                        <h3 className="font-heading font-black text-[#111c2f] text-xl leading-tight group-hover:text-[#4471c4] transition-colors mb-2">
                                            {language === 'FR' ? rel.title : rel.titleEn}
                                        </h3>
                                        <p className="text-[9px] text-[#111c2f]/50 font-black uppercase tracking-widest">{localFormatDate(rel.date)}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Comments Section */}
                <div className="lg:col-span-8">
                    <div className="flex items-center gap-3 mb-10">
                        <h2 className="text-[10px] font-black text-[#111c2f]/50 tracking-widest uppercase">
                            Commentaires ({comments.filter(c => c.status === 'approved').length})
                        </h2>
                    </div>

                    <div className="space-y-6 mb-16">
                        <AnimatePresence>
                            {comments.map(comment => (
                                <div key={comment.id} className="border-b border-[#111c2f]/10 pb-6">
                                    <CommentItem comment={comment} onReply={(id) => setReplyingTo(replyingTo === id ? null : id)} />
                                    <AnimatePresence>
                                        {replyingTo === comment.id && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="ml-8 mt-4 pl-4 border-l border-[#111c2f]/20">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-[#4471c4] mb-4">{t('repondre')} {comment.name}</p>
                                                <CommentForm onSubmit={handleAddComment} parentId={comment.id} onCancel={() => setReplyingTo(null)} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </AnimatePresence>
                        {comments.length === 0 && (
                            <p className="text-[#111c2f]/50 text-sm font-medium">{language === 'FR' ? "Aucun commentaire pour le moment." : "No comments yet."}</p>
                        )}
                    </div>

                    {/* New Comment Form */}
                    <div className="bg-gray-50 p-8 md:p-12 border border-[#111c2f]/10 rounded-[40px]">
                        <h3 className="text-[10px] font-black text-[#111c2f]/50 uppercase tracking-widest mb-8">{t('laisser_un_commentaire')}</h3>
                        <CommentForm onSubmit={handleAddComment} />
                    </div>
                </div>
            </div>
        </main>
    );
}
