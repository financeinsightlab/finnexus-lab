'use client'

import { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { Upload, Search, Grid, List, Filter, X, Check, Image as ImageIcon, FileText, Video, Music, Trash2, Save, Copy } from 'lucide-react'

interface MediaItem {
  id: string
  filename: string
  originalName: string
  url: string
  mimeType: string
  size: number
  width?: number | null
  height?: number | null
  altText?: string | null
  caption?: string | null
  description?: string | null
  uploadedAt: string
}

export default function MediaLibraryClient() {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterType, setFilterType] = useState<string>('all')
  const [selectedMedia, setSelectedMedia] = useState<string[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)

  // Edit fields
  const [isSaving, setIsSaving] = useState(false)
  const [editForm, setEditForm] = useState({
    filename: '',
    altText: '',
    caption: '',
    description: ''
  })

  // Watch selected media for editing
  useEffect(() => {
    if (selectedMedia.length === 1) {
      const item = media.find(m => m.id === selectedMedia[0])
      if (item) {
        setEditForm({
          filename: item.originalName || '',
          altText: item.altText || '',
          caption: item.caption || '',
          description: item.description || ''
        })
      }
    }
  }, [selectedMedia, media])

  // Fetch media from API
  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (filterType !== 'all') params.append('type', filterType)
      
      const response = await fetch(`/api/media/list?${params.toString()}`)
      const data = await response.json()
      
      if (data.success) {
        setMedia(data.data.media || [])
      }
    } catch (error) {
      console.error('Failed to fetch media:', error)
    } finally {
      setLoading(false)
    }
  }, [search, filterType])

  useEffect(() => {
    fetchMedia()
  }, [fetchMedia])

  // Handle file upload
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true)
    setUploadProgress(0)
    
    const formData = new FormData()
    acceptedFiles.forEach(file => {
      formData.append('files', file)
    })

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90))
      }, 200)

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)

      const result = await response.json()
      setUploadProgress(100)

      if (result.success) {
        await fetchMedia()
        setSelectedMedia([])
      } else {
        console.error('Upload failed:', result.error)
        alert(`Upload failed: ${result.error}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload error occurred. Please try again.')
    } finally {
      setTimeout(() => {
        setUploading(false)
        setUploadProgress(0)
      }, 500)
    }
  }, [fetchMedia])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.svg'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  // Handle media selection
  const toggleMediaSelection = (id: string, shiftKey: boolean = false) => {
    setSelectedMedia(prev => {
      if (shiftKey && prev.length > 0) {
         // simplistic multiple selection range omitted for brevity, just toggle.
      }
      return prev.includes(id)
        ? prev.filter(mediaId => mediaId !== id)
        : [...prev, id]
    })
  }

  // Handle single clear selection
  const handleClearSelection = () => {
    setSelectedMedia([])
  }

  // Handle bulk or single delete
  const handleDeleteSelected = async () => {
    if (!selectedMedia.length) return
    const msg = selectedMedia.length === 1 
      ? 'Delete this item permanently?' 
      : `Delete ${selectedMedia.length} selected items permanently?`
    
    if (!confirm(msg)) return

    try {
      // Loop over and delete. A bulk delete API is better, but this works for now.
      for (const id of selectedMedia) {
        await fetch(`/api/media/${id}`, { method: 'DELETE' })
      }
      setSelectedMedia([])
      await fetchMedia()
    } catch (error) {
      console.error('Delete failed:', error)
      alert("Failed to delete some items.")
    }
  }

  // Handle single item save
  const handleSaveMetadata = async (id: string) => {
    try {
      setIsSaving(true)
      const res = await fetch(`/api/media/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      })
      if (res.ok) {
        const result = await res.json()
        if (result.success && result.data) {
          setMedia(prev => prev.map(m => m.id === id ? { ...m, ...result.data } : m))
          alert('Saved changes!')
        }
      } else {
        alert('Failed to save changes.')
      }
    } catch (e) {
      console.error(e)
      alert('Error saving changes.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCopyUrl = (url: string) => {
    const fullUrl = `${window.location.origin}${url}`
    navigator.clipboard.writeText(fullUrl)
    alert('Copied URL to clipboard')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <ImageIcon className="w-5 h-5 text-blue-400" />
    if (mimeType.startsWith('video/')) return <Video className="w-5 h-5 text-purple-400" />
    if (mimeType.startsWith('audio/')) return <Music className="w-5 h-5 text-green-400" />
    if (mimeType.includes('pdf')) return <FileText className="w-5 h-5 text-red-400" />
    return <FileText className="w-5 h-5 text-content-secondary" />
  }

  const filteredMedia = media.filter(item => {
    if (filterType === 'all') return true
    if (filterType === 'image') return item.mimeType.startsWith('image/')
    if (filterType === 'document') return item.mimeType.startsWith('application/')
    return item.mimeType.includes(filterType)
  })

  // Which item are we single-viewing for details?
  const activeMediaId = selectedMedia.length === 1 ? selectedMedia[0] : null
  const activeMedia = activeMediaId ? media.find(m => m.id === activeMediaId) : null

  return (
    <div className="min-h-screen bg-surface-muted text-content-primary p-3 sm:p-6 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Media Library</h1>
        <p className="text-content-secondary mt-2">Upload and manage your media files</p>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row gap-4 lg:gap-6 min-h-[500px] min-w-0">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Upload Zone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center cursor-pointer transition-all ${
              isDragActive
                ? 'border-brand bg-brand-muted'
                : 'border-border hover:border-border-strong bg-surface'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-content-secondary" />
            <h3 className="text-xl font-semibold mb-2">
              {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
            </h3>
            <p className="text-content-secondary mb-4">or click to browse</p>
            <p className="text-sm text-content-muted">Supports images, PDFs, and documents up to 10MB</p>
            
            {uploading && (
              <div className="mt-6">
                <div className="w-full bg-surface-muted rounded-full h-2">
                  <div
                    className="bg-brand h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-brand mt-2 font-bold uppercase tracking-widest">Uploading... {Math.floor(uploadProgress)}%</p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-content-secondary w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand text-content-primary"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-content-secondary" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-surface border border-border rounded-lg px-3 py-2 text-content-primary outline-none focus:border-brand"
                >
                  <option value="all">All Types</option>
                  <option value="image">Images</option>
                  <option value="document">Documents</option>
                  <option value="application/pdf">PDFs</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-surface border border-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-surface-muted' : 'text-content-secondary'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-surface-muted' : 'text-content-secondary'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Bulk Actions */}
              {selectedMedia.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold bg-brand/20 text-brand px-3 py-1.5 rounded-lg border border-brand/50">
                    {selectedMedia.length} selected
                  </span>
                  <button
                    onClick={handleClearSelection}
                    className="p-1.5 bg-surface hover:bg-accent rounded-lg text-content-secondary transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  {selectedMedia.length > 1 && (
                     <button
                        onClick={handleDeleteSelected}
                        className="px-4 py-2 bg-error-muted text-error hover:bg-error hover:text-content-inverse rounded-lg transition-colors border border-error/50"
                     >
                       Bulk Delete
                     </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Media Grid/List */}
          <div className="flex-1 overflow-auto bg-surface rounded-2xl border border-border p-6 shadow-2xl">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand"></div>
                <p className="mt-4 text-content-secondary font-bold uppercase tracking-widest text-xs">Loading media repository...</p>
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="text-center py-20 rounded-xl">
                <div className="w-20 h-20 bg-surface-muted rounded-full flex items-center justify-center mx-auto mb-6 border border-border shadow-lg">
                  <ImageIcon className="w-10 h-10 text-content-muted" />
                </div>
                <h3 className="text-xl font-bold mb-2">No media found</h3>
                <p className="text-content-muted text-sm">
                  {search || filterType !== 'all' ? 'Try changing your search or filter configuration' : 'Upload your first file to the global media pool'}
                </p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredMedia.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    aria-pressed={selectedMedia.includes(item.id)}
                    aria-label={`${selectedMedia.includes(item.id) ? 'Deselect' : 'Select'} ${item.originalName}`}
                    className={`w-full text-left relative group bg-surface rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                      selectedMedia.includes(item.id) ? 'border-brand ring-2 ring-brand/30' : 'border-border hover:border-border-strong'
                    }`}
                    onClick={(e) => toggleMediaSelection(item.id, e.shiftKey)}
                  >
                    <div className="absolute top-3 left-3 z-10">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors border ${
                        selectedMedia.includes(item.id) ? 'bg-primary border-brand' : 'bg-black/50 border-border-strong group-hover:border-border-strong'
                      }`}>
                        {selectedMedia.includes(item.id) && <Check className="w-4 h-4 text-primary-foreground font-bold" />}
                      </div>
                    </div>

                    <div className="aspect-square relative bg-surface">
                      {item.mimeType.startsWith('image/') ? (
                        <Image
                          src={item.url}
                          alt={item.originalName || ''}
                          fill
                          className="object-cover transition-transform group-hover:scale-105 duration-500"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                          <div className="p-4 bg-surface-muted rounded-2xl border border-border-subtle">
                             {getFileIcon(item.mimeType)}
                          </div>
                          <span className="text-[10px] font-bold text-content-muted uppercase tracking-widest bg-surface-muted px-2 py-1 rounded-md">
                            {item.mimeType.split('/')[1]}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 border-t border-border">
                      <p className="text-sm font-bold truncate group-hover:text-brand transition-colors text-content-primary" title={item.originalName}>{item.originalName}</p>
                      <div className="flex justify-between items-center mt-2 opacity-70">
                        <span className="text-[10px] font-bold bg-surface-muted px-1.5 py-0.5 rounded text-content-secondary">
                          {formatFileSize(item.size)}
                        </span>
                        <span className="text-[10px] uppercase text-content-muted font-bold tracking-wider">
                          {new Date(item.uploadedAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-surface rounded-xl overflow-hidden border border-border">
                <table className="w-full text-left">
                  <thead className="bg-surface border-b border-border">
                    <tr>
                      <th className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedMedia.length === filteredMedia.length && filteredMedia.length > 0}
                          onChange={() => {
                            if (selectedMedia.length === filteredMedia.length) setSelectedMedia([])
                            else setSelectedMedia(filteredMedia.map(item => item.id))
                          }}
                          className="rounded bg-transparent border-gray-600"
                        />
                      </th>
                      <th className="py-4 px-4 text-xs font-bold text-content-muted uppercase tracking-widest">Name</th>
                      <th className="py-4 px-4 text-xs font-bold text-content-muted uppercase tracking-widest">Type</th>
                      <th className="py-4 px-4 text-xs font-bold text-content-muted uppercase tracking-widest">Size</th>
                      <th className="py-4 px-4 text-xs font-bold text-content-muted uppercase tracking-widest">Date Uploaded</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {filteredMedia.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => toggleMediaSelection(item.id)}
                        className={`hover:bg-surface-muted transition-colors cursor-pointer group ${
                          selectedMedia.includes(item.id) ? 'bg-brand/10' : ''
                        }`}
                      >
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedMedia.includes(item.id)}
                            onClick={(e) => e.stopPropagation()}
                            onChange={() => toggleMediaSelection(item.id)}
                            className="rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center border border-border relative overflow-hidden flex-shrink-0">
                               {item.mimeType.startsWith('image/') ? (
                                  <Image src={item.url} alt={item.originalName} fill className="object-cover" />
                               ) : (
                                  getFileIcon(item.mimeType)
                               )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-sm text-content-primary group-hover:text-brand transition-colors truncate">{item.originalName}</p>
                              <p className="text-xs text-content-muted truncate" title={item.url}>{item.url}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 bg-surface-muted border border-border rounded-lg text-[10px] font-bold uppercase tracking-wider text-content-secondary">
                            {item.mimeType.split('/')[1] || item.mimeType}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold text-content-secondary">
                          {formatFileSize(item.size)}
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold text-content-secondary">
                          {new Date(item.uploadedAt).toLocaleDateString(undefined, {dateStyle: 'medium'})}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Attachment Details Sidebar - Visible when exactly ONE item is selected */}
        {activeMedia && (
          <div className="w-full lg:w-96 bg-surface border border-border flex flex-col rounded-2xl overflow-hidden shadow-2xl shrink-0 my-0 lg:my-auto h-[min(60vh,600px)] lg:h-[min(calc(100vh-250px),800px)]">
             <div className="p-5 border-b border-border bg-surface flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-brand uppercase tracking-[0.2em]">Attachment Details</h3>
                <button onClick={handleClearSelection} className="p-1 hover:bg-accent rounded-lg text-content-muted">
                  <X className="w-4 h-4" />
                </button>
             </div>
             
             <div className="flex-1 overflow-y-auto">
               <div className="p-5 border-b border-border bg-surface">
                  <div className="aspect-video relative rounded-xl overflow-hidden bg-black/50 mb-4 border border-border shadow-inner">
                    {activeMedia.mimeType.startsWith('image/') ? (
                      <Image
                        src={activeMedia.url}
                        alt={activeMedia.altText || activeMedia.originalName}
                        fill
                        className="object-contain"
                        sizes="320px"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        {getFileIcon(activeMedia.mimeType)}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-xs font-medium text-content-secondary bg-surface-muted p-4 rounded-xl border border-border-subtle">
                    <p className="flex justify-between"><span className="text-content-muted">Name:</span> <span className="truncate ml-2 text-content-secondary font-bold">{activeMedia.originalName}</span></p>
                    <p className="flex justify-between"><span className="text-content-muted">Type:</span> <span className="text-content-secondary">{activeMedia.mimeType}</span></p>
                    <p className="flex justify-between"><span className="text-content-muted">Uploaded:</span> <span className="text-content-secondary">{new Date(activeMedia.uploadedAt).toLocaleString()}</span></p>
                    <p className="flex justify-between"><span className="text-content-muted">File size:</span> <span className="text-content-secondary font-mono">{formatFileSize(activeMedia.size)}</span></p>
                    {activeMedia.width && activeMedia.height && (
                      <p className="flex justify-between"><span className="text-content-muted">Dimensions:</span> <span className="text-content-secondary font-mono">{activeMedia.width} x {activeMedia.height}</span></p>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <button onClick={() => handleDeleteSelected()} className="flex items-center gap-2 text-error hover:text-content-inverse hover:bg-error px-3 py-2 rounded-lg text-xs font-bold transition-colors w-full justify-center border border-transparent hover:border-error">
                      <Trash2 className="w-4 h-4" /> Permanently Delete
                    </button>
                  </div>
               </div>

               <div className="p-5 space-y-5 bg-surface h-full">
                  <div>
                    <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Original File URL</label>
                    <div className="flex">
                      <input 
                        type="text" 
                        readOnly 
                        value={`${window.location.origin}${activeMedia.url}`}
                        className="flex-1 bg-surface border border-border border-r-0 rounded-l-lg px-3 py-2.5 text-xs text-content-secondary font-mono outline-none"
                      />
                      <button 
                        onClick={() => handleCopyUrl(activeMedia.url)}
                        className="px-4 bg-surface-muted hover:bg-accent border border-border rounded-r-lg text-content-primary transition-colors border-l-0"
                        title="Copy URL"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Title</label>
                    <input 
                      type="text" 
                      value={editForm.filename}
                      onChange={(e) => setEditForm({...editForm, filename: e.target.value})}
                      className="w-full bg-surface border border-border rounded-lg px-3 py-2.5 text-sm font-semibold text-content-primary outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Alt Text <span className="text-content-muted font-normal normal-case ml-1">(Important for SEO)</span></label>
                    <textarea 
                      rows={2}
                      value={editForm.altText}
                      onChange={(e) => setEditForm({...editForm, altText: e.target.value})}
                      placeholder="Describe the image..."
                      className="w-full bg-surface border border-border rounded-lg p-3 text-sm text-content-secondary outline-none focus:border-brand resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Caption</label>
                    <textarea 
                      rows={2}
                      value={editForm.caption}
                      onChange={(e) => setEditForm({...editForm, caption: e.target.value})}
                      className="w-full bg-surface border border-border rounded-lg p-3 text-sm text-content-secondary outline-none focus:border-brand resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2">Description</label>
                    <textarea 
                      rows={3}
                      value={editForm.description}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      className="w-full bg-surface border border-border rounded-lg p-3 text-sm text-content-secondary outline-none focus:border-brand resize-none"
                    />
                  </div>
               </div>
             </div>
             
             {/* Save Button */}
             <div className="p-4 border-t border-border bg-surface">
               <button 
                  onClick={() => handleSaveMetadata(activeMedia.id)} 
                  disabled={isSaving}
                  className="w-full py-3 bg-primary hover:bg-primary-hover rounded-xl text-sm font-bold text-primary-foreground shadow-[0_0_20px_rgba(13,110,110,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  {isSaving ? <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></span> : <Save className="w-4 h-4" />}
                  {isSaving ? 'UPDATING METADATA...' : 'SAVE DETAILS'}
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  )
}