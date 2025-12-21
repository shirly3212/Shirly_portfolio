
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
    N12_MAGAZINE_IMAGES, 
    GALGALTZ_IMAGES, 
    PHOTO_EDITING_IMAGES, 
    DIVERSE_DESIGNS, 
    ALL_GRAPHIC_PROJECTS, 
    SECTIONS 
} from './constants';
import { ProjectData } from './types';

// --- SUB-COMPONENTS ---

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed w-full z-[1000] bg-white/80 backdrop-blur-md shadow-md border-b border-slate-100">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center flex-wrap">
                <div className="flex items-center group cursor-pointer" onClick={() => window.location.href = 'https://shirly3212.github.io/Shirly_portfolio/index.html'}>
                    <i className="fas fa-code text-blue-600 text-3xl mr-2 group-hover:rotate-12 transition-transform"></i>
                    <h1 className="text-3xl font-bold text-gray-800 hover:text-blue-600 transition duration-300 rounded-lg p-2 font-['Inter']">
                        Shirly Herscovici
                    </h1>
                </div>

                {/* Mobile Toggle */}
                <button 
                    className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                </button>

                {/* Nav Links */}
                <ul className={`
                    fixed md:relative top-[72px] md:top-0 left-0 w-full md:w-auto 
                    bg-white md:bg-transparent flex flex-col md:flex-row items-center gap-0 md:gap-8 
                    md:flex transition-all duration-300 ${isMenuOpen ? 'flex opacity-100' : 'hidden md:flex opacity-100'}
                `}>
                    <li><a href="https://shirly3212.github.io/Shirly_portfolio/index.html" className="text-lg text-gray-700 hover:text-blue-600 transition duration-300 py-2 px-3 rounded-md font-['Inter']">Home</a></li>
                    <li><a href="#" className="text-lg text-white bg-blue-600 hover:bg-blue-700 py-2 px-3 rounded-md font-['Inter']">Design</a></li>
                    <li><a href="#" className="text-lg text-gray-700 hover:text-blue-600 py-2 px-3 rounded-md font-['Inter']">Video</a></li>
                    <li><a href="#" className="text-lg text-gray-700 hover:text-blue-600 py-2 px-3 rounded-md font-['Inter']">AI</a></li>
                    <li><a href="#contact-section" className="text-lg text-gray-700 hover:text-blue-600 py-2 px-3 rounded-md font-['Inter']">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

const ScrollProjectCard: React.FC<{ imgSrc: string; onImageClick: (src: string) => void }> = ({ imgSrc, onImageClick }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<number | null>(null);
    const userScrolledRef = useRef(false);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;
        const startAutoScroll = () => {
            intervalRef.current = window.setInterval(() => {
                if (userScrolledRef.current || !scrollContainer) return;
                if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 2) {
                    scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    scrollContainer.scrollBy({ top: 1, behavior: 'smooth' });
                }
            }, 50);
        };
        const stopAutoScroll = () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
        const handleInteraction = () => {
            userScrolledRef.current = true;
            stopAutoScroll();
        };
        startAutoScroll();
        scrollContainer.addEventListener('scroll', handleInteraction, { passive: true });
        scrollContainer.addEventListener('touchstart', handleInteraction, { passive: true });
        return () => {
            stopAutoScroll();
            if (scrollContainer) {
              scrollContainer.removeEventListener('scroll', handleInteraction);
              scrollContainer.removeEventListener('touchstart', handleInteraction);
            }
        };
    }, []);

    return (
        <div className="project relative min-h-[350px] rounded-2xl bg-[#f8fafc] border border-slate-100 shadow-xl transition-all duration-500 hover:scale-[1.02] overflow-hidden">
            <div className="absolute bottom-4 right-4 z-20 w-8 h-8 animate-bounce opacity-40">
                <svg fill="#7c3aed" viewBox="0 0 24 24" className="w-full h-full"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm1,8H11V6H8l4-4,4,4H13Z" transform="rotate(180 12 12)" /></svg>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-white/40 to-transparent z-10 pointer-events-none"></div>
            <div ref={scrollContainerRef} className="scroll-container h-[500px] overflow-y-scroll scroll-smooth no-scrollbar">
                <img src={imgSrc} onClick={() => onImageClick(imgSrc)} alt="Scrolling Project" className="w-full h-auto block cursor-zoom-in" title="Click to expand" />
            </div>
        </div>
    );
};

const FadeProjectCard: React.FC<{ images: string[]; onImageClick: (src: string) => void }> = ({ images, onImageClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="project relative min-h-[350px] overflow-hidden rounded-2xl bg-[#f8fafc] border border-slate-100 shadow-xl transition-all duration-500 hover:scale-[1.02] cursor-zoom-in" onClick={() => onImageClick(images[currentIndex])} title="Click to expand">
            {images.map((imgSrc, index) => (
                <img
                    key={imgSrc}
                    src={imgSrc}
                    alt={`Fading project ${index + 1}`}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                />
            ))}
        </div>
    );
};

// --- MAIN SECTIONS ---

const AllGraphicProjectsSection: React.FC = () => (
    <section id="all-graphic-projects" className="scroll-reveal bg-white text-slate-800 p-[8rem_8%] max-lg:p-[4rem_5%] min-h-[100vh] relative flex flex-col justify-center">
        <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-500 pb-4 tracking-tight font-['Inter']">Design Works</h1>
            <div className="max-w-3xl mx-auto space-y-4">
                <p className="text-slate-500 text-base leading-relaxed font-['Inter']">
                    This portfolio showcases a diverse range of expertise: from high-fidelity <strong>Editorial Layouts</strong> for N12 Magazine and cinematic <strong>UI/UX Interfaces</strong> for Galgalatz collaborations, to advanced <strong>Digital Photo Manipulation</strong> and technical <strong>Data Visualization</strong>. Each piece represents a synergy of aesthetic precision and functional design tailored for Israel's premier media ecosystems.
                </p>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {ALL_GRAPHIC_PROJECTS.map((project, idx) => (
                <div 
                    key={idx} 
                    className="project-card-premium group cursor-pointer" 
                    onClick={() => window.open(project.live_demo, '_blank')}
                    title="Visit Project Website"
                >
                    <div className="relative overflow-hidden h-64">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                             <div className="bg-white text-violet-600 px-6 py-2 rounded-full font-bold shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform flex items-center gap-2">Visit Site <i className="fas fa-external-link-alt text-sm"></i></div>
                        </div>
                    </div>
                    <div className="p-8 flex flex-col justify-between flex-grow">
                        <div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-violet-600 transition-colors tracking-tight font-['Inter']">{project.title}</h3>
                            <p className="text-slate-500 mb-6 leading-relaxed text-sm line-clamp-3 font-['Inter']">{project.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 3).map(tech => (
                                <span key={tech} className="text-[10px] uppercase tracking-widest font-black px-3 py-1 bg-violet-50 rounded-full text-violet-500 border border-violet-100 font-['Inter']">{tech}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const N12MagazineSection: React.FC<{ onImageClick: (src: string) => void }> = ({ onImageClick }) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const adjustHeight = () => {
        if (gridRef.current && wrapperRef.current && window.innerWidth >= 1024) {
          wrapperRef.current.style.height = `${gridRef.current.offsetHeight}px`;
        } else if (wrapperRef.current) {
          wrapperRef.current.style.height = 'auto';
        }
      };
      adjustHeight();
      window.addEventListener('resize', adjustHeight);
      return () => window.removeEventListener('resize', adjustHeight);
    }, []);

    return (
        <section id="n12-magazine" className="scroll-reveal bg-slate-50 text-slate-900 p-[6rem_8%] grid lg:grid-cols-[4fr_1fr] grid-cols-1 gap-12 items-start max-lg:p-[4rem_5%] max-lg:gap-8 min-h-[100vh]">
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <ScrollProjectCard imgSrc={N12_MAGAZINE_IMAGES.scroll1} onImageClick={onImageClick} />
                <FadeProjectCard images={N12_MAGAZINE_IMAGES.fade1} onImageClick={onImageClick} />
                <FadeProjectCard images={N12_MAGAZINE_IMAGES.fade2} onImageClick={onImageClick} />
                <ScrollProjectCard imgSrc={N12_MAGAZINE_IMAGES.scroll2} onImageClick={onImageClick} />
            </div>
            <div ref={wrapperRef} className="lg:relative flex flex-col max-lg:order-[-1] max-lg:text-center max-lg:mb-8">
                <h2 className="text-slate-200 font-black text-[7vw] font-['Playfair_Display'] uppercase whitespace-nowrap leading-[0.8] z-10 lg:absolute lg:top-0 lg:left-full lg:origin-top-left lg:transform lg:rotate-90 lg:translate-y-[15px]">N12 MAGAZINE</h2>
                <div className="relative z-20">
                    <h3 className="text-violet-600 text-3xl font-black mb-6 lg:mt-0 tracking-tight font-['Inter']">Magazine Editorial</h3>
                    <p className="font-['Inter'] text-[1.1rem] leading-relaxed text-slate-500 w-full lg:max-w-[250px] pt-4 max-lg:max-w-full max-lg:mx-auto">
                        Elevated editorial design for N12's digital long-reads. Utilizing balanced white space, heavy contrast, and precise grid alignment to guide readers through complex narratives.
                    </p>
                </div>
            </div>
        </section>
    );
};

const GalgaltzSection: React.FC<{ onImageClick: (src: string) => void }> = ({ onImageClick }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const changeSlide = (newSlideIndex: number) => {
        if (isAnimating || newSlideIndex === currentSlide) return;
        setIsAnimating(true);
        setCurrentSlide(newSlideIndex);
        setTimeout(() => setIsAnimating(false), 400); 
    };

    const handleNext = () => {
        if (isAnimating) return;
        changeSlide((currentSlide + 1) % GALGALTZ_IMAGES.length);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        changeSlide((currentSlide - 1 + GALGALTZ_IMAGES.length) % GALGALTZ_IMAGES.length);
    };
    
    return (
        <section id="galgaltz" className="scroll-reveal bg-[#0d0d0d] text-white p-[6rem_8%] flex flex-col items-center justify-center relative overflow-hidden max-lg:p-[4rem_5%] min-h-[100vh]">
            <div className="absolute bottom-0 left-0 w-full h-[100px] flex justify-between items-end gap-0 opacity-20 z-[1] overflow-hidden mb-5">
                {Array.from({ length: 80 }).map((_, i) => (
                    <div
                        key={i}
                        className="w-[3px] min-h-[10px] bg-violet-500 rounded-sm origin-bottom animate-[waveMotion_1.5s_ease-in-out_infinite_alternate]"
                        style={{
                            animationDuration: `${(Math.random() * 1) + 1}s`,
                            animationDelay: `${Math.random() * 1.5}s`,
                        }}
                    ></div>
                ))}
            </div>
            <div className="w-full">
                <h2 className="text-3xl lg:text-5xl font-black uppercase text-center relative z-[2] tracking-tighter text-white font-['Inter']">
                    GALGALTZ x N12
                    <span className="block w-20 h-1.5 mx-auto mt-4 bg-gradient-to-r from-violet-600 to-blue-400 rounded-full animate-[glowLine_3s_ease-in-out_infinite_alternate]"></span>
                </h2>
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 w-full max-w-6xl mt-20 z-[2] mx-auto">
                    <div className="lg:flex-[3] lg:pr-12 text-center lg:text-left">
                        <p className="max-w-3xl text-center lg:text-left text-slate-300 text-[1.1rem] leading-loose font-['Inter']">
                            The <strong>"Music from the Screen"</strong> chart is a massive collaboration. I engineered a cinematic UI/UX that captures the energy of film music while maintaining voting functionality.
                        </p>
                        <div className="mt-12 text-center flex flex-col items-center lg:items-start">
                            <h3 className="text-xl font-bold text-white mb-6 font-['Inter']">Experience the Official Chart</h3>
                            <div onClick={() => window.open('https://www.mako.co.il/music-galgalatz/screen_music', '_blank')} className="relative w-full h-0 pb-[56.25%] overflow-hidden max-w-xl mx-auto lg:mx-0 rounded-3xl shadow-2xl z-[2] transition-all duration-500 hover:scale-105 cursor-pointer group border border-white/5">
                                <img src="img_new/img_1.jpg" alt="Podcast Preview" className="absolute top-0 left-0 w-full h-full object-cover z-[1]"/>
                                <div className="absolute inset-0 bg-black/60 z-[1] group-hover:bg-black/40 transition-colors backdrop-blur-[1px]"></div>
                                <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-3 text-white">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                                        <svg className="w-8 h-8 fill-violet-600 ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                    </div>
                                    <span className="font-black text-lg tracking-widest uppercase font-['Inter']">Open Official Page</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:flex-[2] flex justify-center w-full lg:pt-8">
                        <div className="group relative bg-[#111] rounded-[40px] w-[340px] h-[600px] border border-white/10 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.8)] transition-all duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] [transform:perspective(1200px)_rotateY(10deg)] hover:[transform:perspective(1200px)_rotateY(0deg)_scale(1.02)]">
                            <div className="w-full h-full absolute top-0 left-0 overflow-hidden rounded-[40px]">
                               <img 
                                    src={GALGALTZ_IMAGES[currentSlide]} 
                                    alt="GALGALTZ N12 UI Screen" 
                                    onClick={() => onImageClick(GALGALTZ_IMAGES[currentSlide])}
                                    className={`w-full h-full object-cover cursor-zoom-in ${isAnimating ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
                               />
                            </div>
                            <button onClick={handlePrev} className="absolute top-1/2 -translate-y-1/2 -left-6 bg-white border border-slate-200 text-violet-600 p-3 z-30 rounded-full w-14 h-14 flex items-center justify-center transition-all duration-300 hover:bg-violet-600 hover:text-white hover:scale-110 shadow-xl">
                                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                            <button onClick={handleNext} className="absolute top-1/2 -translate-y-1/2 -right-6 bg-white border border-slate-200 text-violet-600 p-3 z-30 rounded-full w-14 h-14 flex items-center justify-center transition-all duration-300 hover:bg-violet-600 hover:text-white hover:scale-110 shadow-xl">
                                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30 bg-black/80 backdrop-blur-md p-[12px_20px] rounded-full shadow-lg border border-white/10">
                                {GALGALTZ_IMAGES.map((_, index) => (
                                    <div 
                                        key={index}
                                        onClick={() => changeSlide(index)}
                                        className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${index === currentSlide ? 'bg-violet-600 scale-150 shadow-sm' : 'bg-slate-700'}`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const PhotoEditingSection: React.FC = () => {
    const [step, setStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [imageSrc, setImageSrc] = useState(PHOTO_EDITING_IMAGES.before);
    const [overlayEffect, setOverlayEffect] = useState<string | null>(null);

    const STEPS_CONFIG = [
        { name: 'Enhance Colors', icon: 'fa-wand-magic-sparkles', nextImage: PHOTO_EDITING_IMAGES.color_corrected, nextStep: 1, animation: 'color-wave' },
        { name: 'Remove Mic', icon: 'fa-microphone-slash', nextImage: PHOTO_EDITING_IMAGES.mic_removed, nextStep: 2, animation: 'dissolve' },
        { name: 'Change Shirt', icon: 'fa-shirt', nextImage: PHOTO_EDITING_IMAGES.new_shirt, nextStep: 3, animation: 'dissolve' },
        { name: 'Remove BG', icon: 'fa-object-ungroup', nextImage: PHOTO_EDITING_IMAGES.no_bg, nextStep: 4, animation: 'scanline' },
    ];

    const handleNextStep = (stepConfig: typeof STEPS_CONFIG[0]) => {
        if (isAnimating || step + 1 !== stepConfig.nextStep) return;
        setIsAnimating(true);
        setOverlayEffect(stepConfig.animation);
        setTimeout(() => {
            setImageSrc(stepConfig.nextImage);
            setStep(stepConfig.nextStep);
            setTimeout(() => {
                setOverlayEffect(null);
                setIsAnimating(false);
            }, 600);
        }, 500);
    };

    const handleReset = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setOverlayEffect('dissolve');
        setTimeout(() => {
            setImageSrc(PHOTO_EDITING_IMAGES.before);
            setStep(0);
            setTimeout(() => {
                setOverlayEffect(null);
                setIsAnimating(false);
            }, 600);
        }, 500);
    };

    return (
        <section id="editing-suite" className="scroll-reveal bg-slate-50 text-slate-800 p-[6rem_8%] overflow-hidden max-lg:p-[4rem_5%] min-h-[100vh] flex items-center">
            <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[1fr_1.5fr] items-center gap-20">
                <div className="w-full text-center xl:text-left">
                    <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter mb-8 text-slate-900 font-['Inter']">
                        The Editing Suite
                        <span className="block w-20 h-1.5 xl:mx-0 mx-auto mt-4 bg-violet-600 rounded-full shadow-[0_4px_10px_rgba(124,58,237,0.3)]"></span>
                    </h2>
                    <p className="mt-8 text-lg text-slate-500 leading-relaxed max-w-lg mx-auto xl:mx-0 font-['Inter']">
                        Interact with my "Editing Console" to see the workflow behind a professional portrait—from color grading to precise digital composition.
                    </p>
                </div>
                <div className="w-full">
                    <div className="w-full max-w-xl mx-auto rounded-[2.5rem] shadow-2xl shadow-violet-100 bg-white p-10 border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5">
                            <i className="fas fa-layer-group text-6xl"></i>
                        </div>
                        <div className="relative overflow-hidden rounded-3xl aspect-square border border-slate-200 bg-slate-50 shadow-inner">
                            <img src={imageSrc} alt="Current edit" className="absolute inset-0 w-full h-full object-cover animate-[fadeIn_0.5s_ease_in_out]" />
                            {overlayEffect === 'scanline' && (
                                <div className="absolute inset-0 z-10 overflow-hidden">
                                    <div className="absolute top-0 left-0 h-2 w-full bg-violet-500/80 shadow-[0_0_25px_#7c3aed] animate-[scanline_0.6s_ease-in-out_forwards]"></div>
                                </div>
                            )}
                            {overlayEffect === 'dissolve' && (
                                <img src={imageSrc} alt="dissolving" className="absolute inset-0 w-full h-full object-cover animate-[dissolve_0.6s_ease-out_forwards]"/>
                            )}
                        </div>
                        <div className="mt-10">
                            <div className="flex justify-between items-center mb-5">
                                <span className="text-slate-400 font-black text-xs uppercase tracking-widest font-['Inter']">{step === 4 ? "Process Completed" : "Processing Core"}</span>
                                <span className="text-violet-600 font-black font-mono text-lg">{Math.round((step / 4) * 100)}%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2.5 mb-10 overflow-hidden">
                                <div className="bg-gradient-to-r from-violet-600 to-indigo-500 h-full rounded-full transition-all duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] shadow-[0_0_15px_rgba(124,58,237,0.4)]" style={{ width: `${(step / 4) * 100}%` }}></div>
                            </div>
                            <div className="flex justify-between items-center gap-4">
                                <div className="flex gap-4">
                                    {STEPS_CONFIG.map((s, index) => (
                                        <button
                                            key={s.name}
                                            onClick={() => handleNextStep(s)}
                                            disabled={step !== index || isAnimating}
                                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 transform border shadow-sm
                                                ${step > index ? 'bg-violet-600 text-white border-violet-600' : ''}
                                                ${step === index ? 'bg-white text-violet-600 border-violet-600 scale-110 shadow-lg shadow-violet-100' : 'bg-slate-50 text-slate-300 border-slate-100 opacity-50'}`}
                                            title={s.name}
                                        >
                                            <i className={`fas ${step > index ? 'fa-check' : s.icon} text-lg`}></i>
                                        </button>
                                    ))}
                                </div>
                                <button onClick={handleReset} disabled={isAnimating} className={`w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 border border-rose-100 hover:bg-rose-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 ${step > 0 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} title="Reset Session">
                                    <i className="fas fa-undo-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const DiverseDesignsSection: React.FC<{ onImageClick: (src: string) => void }> = ({ onImageClick }) => (
    <section id="spectrum-of-work" className="scroll-reveal bg-[#0d0d0d] text-white p-[6rem_8%] max-lg:p-[4rem_5%] overflow-hidden min-h-[100vh]">
        <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white font-['Inter']">Gallery</h2>
            <span className="block w-20 h-1.5 mx-auto mt-4 bg-violet-600 rounded-full shadow-[0_4px_10px_rgba(124,58,237,0.3)]"></span>
            <p className="mt-8 text-slate-400 italic font-['Playfair_Display'] text-lg">A curated archive of diverse projects and historical media coverage.</p>
        </div>
        <div className="[column-count:1] sm:[column-count:2] lg:[column-count:3] gap-10 space-y-10">
            {DIVERSE_DESIGNS.map((design) => (
                <div key={design.src} onClick={() => onImageClick(design.src)} className="group relative overflow-hidden rounded-3xl shadow-2xl shadow-black cursor-zoom-in [break-inside:avoid] transform transition-all duration-500 hover:-translate-y-3 border border-white/5">
                    <img src={design.src} alt={design.title} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                        <h3 className="text-white font-bold text-xl tracking-tight font-['Inter']">{design.title}</h3>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

// --- OVERLAYS & MODALS ---

const ImageModal: React.FC<{ src: string | null; onClose: () => void }> = ({ src, onClose }) => {
    if (!src) return null;
    return (
        <div className="fixed inset-0 bg-black/95 flex justify-center items-center z-[2000] backdrop-blur-xl animate-[fadeIn_0.3s_ease]" onClick={onClose}>
            <div className="relative max-w-[95vw] max-h-[95vh] p-2" onClick={(e) => e.stopPropagation()}>
                <button className="absolute -top-6 -right-6 text-white text-2xl font-bold bg-violet-600 rounded-full w-12 h-12 flex justify-center items-center shadow-2xl z-50 hover:scale-110 transition-transform" onClick={onClose}>&times;</button>
                <img src={src} className="block max-w-full max-h-[85vh] object-contain rounded-3xl shadow-2xl shadow-violet-200 border border-white/10" />
            </div>
        </div>
    );
};

const SideNav: React.FC<{ activeSection: string }> = ({ activeSection }) => {
    const isDarkSection = ['galgaltz', 'spectrum-of-work'].includes(activeSection);
    return (
        <nav className="fixed top-1/2 right-8 -translate-y-1/2 z-[100] flex flex-col gap-8 max-md:hidden">
            {SECTIONS.map(s => (
                <div key={s.id} className="group relative flex items-center justify-end">
                    <div className="absolute right-full mr-8 px-4 py-2 rounded-xl bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 shadow-2xl shadow-violet-200 font-['Inter']">{s.title}</div>
                    <a href={`#${s.id}`} className={`block w-3 h-3 rounded-full transition-all duration-500 border-2 ${activeSection === s.id ? 'bg-violet-600 scale-[2] border-white shadow-xl shadow-violet-200' : (isDarkSection ? 'bg-white/20 border-white/10 hover:bg-white/40' : 'bg-slate-200 border-transparent hover:bg-violet-300')}`}></a>
                </div>
            ))}
        </nav>
    );
};

const Footer: React.FC = () => (
    <footer className="bg-slate-50 text-center p-24 border-t border-slate-100">
        <h3 className="text-4xl font-black mb-8 tracking-tighter text-slate-900 font-['Inter']">Let's Create Together</h3>
        <p className="text-slate-500 mb-14 text-lg max-w-md mx-auto leading-relaxed font-['Inter']">Ready to transform your vision into an industry-leading visual experience?</p>
        <div className="flex justify-center gap-14">
            <a href="mailto:shirly3212@gmail.com" className="text-slate-400 hover:text-violet-600 text-3xl transition-all hover:scale-125 hover:rotate-6"><i className="fas fa-envelope"></i></a>
            <a href="https://www.youtube.com/channel/UCmoA-WifFijhY71DV90qi0w" target="_blank" className="text-slate-400 hover:text-violet-600 text-3xl transition-all hover:scale-125 hover:rotate-6"><i className="fab fa-youtube"></i></a>
            <a href="tel:0549775275" className="text-slate-400 hover:text-violet-600 text-3xl transition-all hover:scale-125 hover:rotate-6"><i className="fas fa-phone"></i></a>
        </div>
        <div className="mt-24 pt-10 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 font-black text-[10px] uppercase tracking-widest px-8 font-['Inter']">
            <p>© 2025 Shirly Herscovici • Senior Graphic Designer</p>
            <p className="text-violet-500/50 tracking-[0.3em] font-['Inter']">Pure Visual Innovation</p>
        </div>
    </footer>
);

// --- APP COMPONENT ---

const App: React.FC = () => {
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState('all-graphic-projects');

    const observeSections = useCallback(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
        );
        SECTIONS.forEach(s => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return observer;
    }, []);

    const observeScrollReveal = useCallback(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('is-visible');
                });
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
        );
        document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
        return observer;
    }, []);

    useEffect(() => {
        const sObserver = observeSections();
        const rObserver = observeScrollReveal();
        return () => {
            sObserver.disconnect();
            rObserver.disconnect();
        };
    }, [observeSections, observeScrollReveal]);

    return (
        <div className="animate-[fadeIn_0.8s_ease_out]">
            <Header />
            <SideNav activeSection={activeSection} />
            <main className="pt-20">
                <AllGraphicProjectsSection />
                <N12MagazineSection onImageClick={setModalImage} />
                <GalgaltzSection onImageClick={setModalImage} />
                <PhotoEditingSection />
                <DiverseDesignsSection onImageClick={setModalImage} />
            </main>
            <Footer />
            <ImageModal src={modalImage} onClose={() => setModalImage(null)} />
        </div>
    );
};

export default App;
