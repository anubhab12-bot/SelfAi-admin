import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { 
  Video, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCw, 
  Download, 
  Trash2, 
  Sliders, 
  Image as ImageIcon, 
  Film, 
  Layers, 
  Clock, 
  CheckCircle2, 
  HelpCircle,
  Maximize2,
  ExternalLink,
  Zap,
  ArrowRight
} from 'lucide-react';
import { GeneratedVideo } from '../types';

export const VideoStudio: React.FC = () => {
  const { 
    videos, 
    generateVideo, 
    deleteVideo, 
    can, 
    addToast,
    features,
    toggleFeature,
    setActiveTab
  } = useAdmin();

  // Mode: Text to Video OR Image to Video
  const [mode, setMode] = useState<'text_to_video' | 'image_to_video'>('text_to_video');

  // Form inputs
  const [prompt, setPrompt] = useState('Cyberpunk metropolis in night rain with neon reflections and flying traffic');
  const [sourceImageUrl, setSourceImageUrl] = useState('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1'>('16:9');
  const [duration, setDuration] = useState<number>(8);
  const [selectedModel, setSelectedModel] = useState<string>('Google Veo 2 (Gemini Video Synthesis)');
  const [cameraMotion, setCameraMotion] = useState<string>('Cinematic Orbit');

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [activeVideo, setActiveVideo] = useState<GeneratedVideo | null>(videos[0] || null);
  const [showGuide, setShowGuide] = useState(true);

  // Check if video feature flag is active
  const videoFeature = features.find((f) => f.key === 'video_generation_engine');
  const isFeatureEnabled = videoFeature ? videoFeature.enabled : true;

  const quickPromptPresets = [
    'Cyberpunk metropolis in night rain with neon reflections and flying traffic',
    'Astronaut walking inside crystalline ice cavern on Jupiter moon, ethereal glowing light',
    'Hyper-detailed drone sweep over turquoise ocean barrier reef and tropical atoll',
    'Macro time-lapse of glowing bioluminescent orchid blooming in dark rainforest'
  ];

  const sampleImages = [
    {
      title: 'Misty Alpine Lake',
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'
    },
    {
      title: 'Neon Cyber City',
      url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=80'
    },
    {
      title: 'Cosmic Nebula',
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80'
    }
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      addToast('error', 'Missing Prompt', 'Please describe the video you want to synthesize.');
      return;
    }

    if (!isFeatureEnabled) {
      addToast('warning', 'Feature Disabled', 'The AI Video feature is currently turned OFF. Enable it in App Features to generate videos.');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(10);
    setGenerationStep('Analyzing prompt semantics and conditioning vectors...');

    // Simulate multi-stage generation progress
    setTimeout(() => {
      setGenerationProgress(35);
      setGenerationStep('Synthesizing spatial keyframes in 1080p resolution...');
    }, 900);

    setTimeout(() => {
      setGenerationProgress(70);
      setGenerationStep('Computing temporal flow and optical motion vectors...');
    }, 1800);

    setTimeout(() => {
      setGenerationProgress(90);
      setGenerationStep('Encoding high-bitrate MP4 video stream...');
    }, 2700);

    setTimeout(async () => {
      try {
        const newVid = await generateVideo({
          type: mode,
          prompt,
          sourceImageUrl: mode === 'image_to_video' ? sourceImageUrl : undefined,
          aspectRatio,
          durationSeconds: duration,
          modelName: selectedModel
        });
        setActiveVideo(newVid);
        setGenerationProgress(100);
        setGenerationStep('Complete!');
      } finally {
        setIsGenerating(false);
      }
    }, 3400);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 1. Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900 border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></span>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Film className="w-5 h-5 text-purple-400" />
              <span>AI Video Studio (Text-to-Video & Image-to-Video)</span>
            </h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Synthesize cinematic motion videos from plain text prompts or animate still photography into living video.
          </p>
        </div>

        {/* Feature Toggle Pill */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">App Status:</span>
            <span className={`text-xs font-bold ${isFeatureEnabled ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isFeatureEnabled ? 'LIVE (100% Rollout)' : 'OFFLINE'}
            </span>
            {videoFeature && can('features:toggle') && (
              <button
                onClick={() => toggleFeature(videoFeature.id)}
                className={`text-[10px] px-2 py-0.5 rounded font-semibold transition-colors ${
                  isFeatureEnabled 
                    ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30' 
                    : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                }`}
              >
                {isFeatureEnabled ? 'Turn OFF' : 'Turn ON'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 💡 Plain-English Guide */}
      <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              How the AI Video Feature Works in Your Self AI App
            </h3>
          </div>
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="text-[11px] text-purple-400 hover:text-purple-300 font-medium"
          >
            {showGuide ? 'Hide Guide' : 'Show Guide'}
          </button>
        </div>

        {showGuide && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs text-slate-300 border-t border-purple-500/10">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block mb-0.5 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-purple-600/30 text-purple-300 flex items-center justify-center text-[10px]">1</span>
                <span>Text to Video</span>
              </strong>
              <p className="text-[11px] text-slate-400">
                You type a description of what you want to see. The AI generates spatial keyframes and fills in motion to produce a cinematic MP4 clip.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block mb-0.5 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-purple-600/30 text-purple-300 flex items-center justify-center text-[10px]">2</span>
                <span>Image to Video</span>
              </strong>
              <p className="text-[11px] text-slate-400">
                Upload or paste an image URL. The AI detects scene depth, foreground objects, and animates fluid camera pan, zoom, or ambient movement.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block mb-0.5 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-purple-600/30 text-purple-300 flex items-center justify-center text-[10px]">3</span>
                <span>Instant App Integration</span>
              </strong>
              <p className="text-[11px] text-slate-400">
                The feature flag is automatically connected to your live app. End-users can access video generation via your app's chat or video tab!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 2. Main Studio Grid: Controls & Video Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 Cols): Generator Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            {/* Mode Switcher */}
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 mb-4">
              <button
                type="button"
                onClick={() => setMode('text_to_video')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'text_to_video'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Text to Video</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('image_to_video')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'image_to_video'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Image to Video</span>
              </button>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              {/* If Image to Video: Image Picker */}
              {mode === 'image_to_video' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                    <span>Source Image</span>
                    <span className="text-[10px] text-slate-500 font-normal">Will be animated</span>
                  </label>
                  
                  <input
                    type="text"
                    value={sourceImageUrl}
                    onChange={(e) => setSourceImageUrl(e.target.value)}
                    placeholder="Paste image URL..."
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 font-mono mb-2"
                  />

                  {/* Sample image chips */}
                  <div className="flex gap-2">
                    {sampleImages.map((img) => (
                      <button
                        key={img.title}
                        type="button"
                        onClick={() => setSourceImageUrl(img.url)}
                        className={`text-[10px] px-2 py-1 rounded-lg border transition-colors truncate max-w-[120px] ${
                          sourceImageUrl === img.url
                            ? 'bg-purple-600/20 text-purple-300 border-purple-500/40 font-semibold'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {img.title}
                      </button>
                    ))}
                  </div>

                  {sourceImageUrl && (
                    <div className="mt-2 relative rounded-xl overflow-hidden border border-slate-800 h-28 bg-slate-950">
                      <img
                        src={sourceImageUrl}
                        alt="Source Preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1.5 left-2 px-1.5 py-0.5 rounded bg-black/60 text-[9px] text-slate-200 backdrop-blur-sm">
                        Source Reference
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Prompt Textarea */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>{mode === 'text_to_video' ? 'Video Prompt' : 'Motion & Action Prompt'}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{prompt.length} chars</span>
                </label>
                <textarea
                  rows={3}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={
                    mode === 'text_to_video'
                      ? 'Describe scene, camera motion, atmosphere, lighting...'
                      : 'Describe how the image should animate (e.g. water rippling, camera flying forward)...'
                  }
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl p-3 focus:outline-none focus:border-purple-500 placeholder:text-slate-500 leading-relaxed"
                />

                {/* Preset Chips */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {quickPromptPresets.slice(0, 2).map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPrompt(p)}
                      className="text-[10px] bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800/80 rounded-lg px-2 py-1 truncate max-w-[200px]"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio & Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Aspect Ratio</label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
                  >
                    <option value="16:9">16:9 (Landscape HD)</option>
                    <option value="9:16">9:16 (Portrait / Reels)</option>
                    <option value="1:1">1:1 (Square Feed)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
                  >
                    <option value={5}>5 seconds</option>
                    <option value={8}>8 seconds (Standard)</option>
                    <option value={10}>10 seconds (Extended)</option>
                  </select>
                </div>
              </div>

              {/* AI Video Model */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Video Synthesis Engine</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
                >
                  <option value="Google Veo 2 (Gemini Video Synthesis)">Google Veo 2 (Highest Quality / Cinematic)</option>
                  <option value="Stable Video Diffusion (SVD-XT)">Stable Video Diffusion (SVD-XT)</option>
                  <option value="Luma Dream Machine">Luma Dream Machine</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
              >
                {isGenerating ? (
                  <RotateCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Film className="w-4 h-4" />
                )}
                <span>
                  {isGenerating 
                    ? 'Synthesizing Video Frames...' 
                    : mode === 'text_to_video' 
                      ? 'Generate Video from Text' 
                      : 'Animate Image to Video'}
                </span>
              </button>
            </form>

            {/* Generation Progress Indicator */}
            {isGenerating && (
              <div className="mt-4 p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-2 animate-pulse">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-300 font-semibold text-[11px] flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-purple-400" />
                    <span>{generationStep}</span>
                  </span>
                  <span className="text-purple-300 font-mono font-bold text-xs">{generationProgress}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (7 Cols): Active Video Player & Metadata */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <h3 className="text-sm font-bold text-white">Active Video Player</h3>
                </div>
                {activeVideo && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-semibold">
                    {activeVideo.aspectRatio} • {activeVideo.durationSeconds}s • 1080p Full HD
                  </span>
                )}
              </div>

              {/* Video Player Display */}
              {activeVideo ? (
                <div className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden bg-black border border-slate-800 shadow-xl aspect-video max-h-[380px] flex items-center justify-center">
                    <video
                      key={activeVideo.videoUrl}
                      controls
                      autoPlay
                      loop
                      muted
                      poster={activeVideo.thumbnailUrl}
                      className="w-full h-full object-contain"
                    >
                      <source src={activeVideo.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  {/* Video Details Card */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-white">{activeVideo.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                          <strong className="text-slate-300">Prompt:</strong> {activeVideo.prompt}
                        </p>
                      </div>

                      <a
                        href={activeVideo.videoUrl}
                        download={`selfai-video-${activeVideo.id}.mp4`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download MP4</span>
                      </a>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>Model: <strong className="text-purple-400">{activeVideo.modelName}</strong></span>
                      <span>Created: {activeVideo.createdAt}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-64 rounded-xl bg-slate-950 border border-slate-800 border-dashed flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                  <Film className="w-8 h-8 text-slate-600 mb-2" />
                  <p className="text-xs font-semibold text-slate-400">No active video loaded</p>
                  <p className="text-[11px] text-slate-500 mt-1">Select a video from below or generate a new clip</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Generated Video Library Gallery */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Video Library & Recent Generations ({videos.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any video to load it in the player or download the MP4.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {videos.map((vid) => {
            const isSelected = activeVideo?.id === vid.id;

            return (
              <div
                key={vid.id}
                onClick={() => setActiveVideo(vid)}
                className={`group p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-950/30 border-purple-500/50 shadow-md ring-1 ring-purple-500/40'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Thumbnail Container */}
                <div className="relative rounded-lg overflow-hidden bg-slate-900 aspect-video mb-2.5">
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-2 rounded-full bg-purple-600 text-white shadow-lg">
                      <Play className="w-4 h-4 fill-white" />
                    </span>
                  </div>

                  <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[10px] font-mono text-white">
                    {vid.durationSeconds}s
                  </span>

                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-purple-600/80 text-[9px] font-bold uppercase tracking-wider text-white">
                    {vid.type === 'text_to_video' ? 'Text' : 'Image'}
                  </span>
                </div>

                {/* Video Info */}
                <h4 className="text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-purple-300 transition-colors">
                  {vid.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {vid.prompt}
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>{vid.modelName.split(' ')[0]}</span>
                  <div className="flex items-center gap-2">
                    <span>{vid.createdAt}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteVideo(vid.id);
                      }}
                      className="p-1 hover:text-rose-400 rounded transition-colors"
                      title="Delete video"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};