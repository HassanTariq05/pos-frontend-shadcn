'use client'

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { format } from 'date-fns'
import { Paperclip, Download, Trash2, PlusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export type AttachmentItem = {
  id?: string // optional – can be generated or passed
  name: string
  file: File
  uploadedAt: string
  url: string
  note?: string
  documentDate?: Date
}

export type AttachmentsManagerRef = {
  getAttachments: () => AttachmentItem[]
  clearAttachments: () => void
  addFiles: (files: FileList | null) => void
}

type AttachmentsManagerProps = {
  className?: string
  initialAttachments?: AttachmentItem[]
  onChange?: (attachments: AttachmentItem[]) => void
  maxFiles?: number
  accept?: string
}

const isImage = (fileName: string) => /\.(png|jpg|jpeg|webp)$/i.test(fileName)
const isPdf = (fileName: string) => /\.pdf$/i.test(fileName)

export const AttachmentsManager = forwardRef<
  AttachmentsManagerRef,
  AttachmentsManagerProps
>(
  (
    {
      className,
      initialAttachments = [],
      onChange,
      maxFiles = 10,
      accept = 'image/*,.pdf,.doc,.docx,.xlsx,.xls',
    },
    ref
  ) => {
    const [attachments, setAttachments] =
      useState<AttachmentItem[]>(initialAttachments)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      getAttachments: () => attachments,
      clearAttachments: () => {
        attachments.forEach((att) => {
          if (att.url) URL.revokeObjectURL(att.url)
        })
        setAttachments([])
      },
      addFiles: (files: FileList | null) => handleFiles(files),
    }))

    const handleFiles = (files: FileList | null) => {
      if (!files || files.length === 0) return

      const now = new Date().toISOString()
      const newItems: AttachmentItem[] = Array.from(files)
        .slice(0, maxFiles - attachments.length) // respect maxFiles
        .map((file) => ({
          name: file.name,
          file,
          uploadedAt: now,
          url: URL.createObjectURL(file),
          note: '',
          documentDate: undefined,
        }))

      setAttachments((prev) => {
        const updated = [...prev, ...newItems]
        onChange?.(updated)
        return updated
      })
    }

    const removeAttachment = (index: number) => {
      setAttachments((prev) => {
        const item = prev[index]
        if (item.url) URL.revokeObjectURL(item.url)
        const updated = prev.filter((_, i) => i !== index)
        onChange?.(updated)
        return updated
      })
    }

    const updateNote = (index: number, note: string) => {
      setAttachments((prev) => {
        const updated = prev.map((item, i) =>
          i === index ? { ...item, note } : item
        )
        onChange?.(updated)
        return updated
      })
    }

    const updateDocumentDate = (index: number, date: Date | undefined) => {
      setAttachments((prev) => {
        const updated = prev.map((item, i) =>
          i === index ? { ...item, documentDate: date } : item
        )
        onChange?.(updated)
        return updated
      })
    }

    return (
      <div className={cn('space-y-4', className)}>
        <div className='h-full rounded-lg border bg-muted/20 p-5'>
          <h3 className='mb-4 text-sm font-semibold text-foreground/90'>
            📎 Attachments
          </h3>

          {attachments.length === 0 ? (
            <div className='flex h-[280px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-muted/30 text-center text-sm text-muted-foreground'>
              <Paperclip className='mb-2 h-10 w-10 text-muted-foreground/60' />
              <p className='font-medium'>No attachments yet</p>
              <p className='mt-1 text-xs'>
                Click "Add Attachment(s)" to upload files
              </p>
            </div>
          ) : (
            <div className='scrollbar-thin scrollbar-thumb-muted max-h-[420px] space-y-3 overflow-y-auto pr-2'>
              {attachments.map((attachment, index) => (
                <div
                  key={index} // better: use uuid if you have many re-renders
                  className='group rounded-lg border bg-background p-3 shadow-sm transition-all duration-200 hover:shadow-md'
                >
                  <div className='flex items-start gap-3'>
                    {/* Preview */}
                    <div className='shrink-0'>
                      <div className='h-16 w-16 overflow-hidden rounded-lg border bg-gradient-to-br from-muted to-background'>
                        {attachment.url ? (
                          isImage(attachment.name) ? (
                            <img
                              src={attachment.url}
                              alt={attachment.name}
                              className='h-full w-full cursor-pointer object-cover transition-transform duration-200 hover:scale-105'
                              onClick={() =>
                                window.open(attachment.url, '_blank')
                              }
                            />
                          ) : isPdf(attachment.name) ? (
                            <iframe
                              src={attachment.url}
                              className='h-full w-full border-0'
                              title={attachment.name}
                            />
                          ) : (
                            <div className='flex h-full w-full items-center justify-center'>
                              <Paperclip className='h-5 w-5 text-muted-foreground' />
                              <span className='ml-1 text-xs font-medium text-muted-foreground'>
                                File
                              </span>
                            </div>
                          )
                        ) : (
                          <div className='flex h-full w-full items-center justify-center bg-muted text-[10px] text-muted-foreground/70'>
                            Pending...
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className='min-w-0 flex-1'>
                      <div className='mb-2 flex items-start justify-between gap-2'>
                        <div className='min-w-0'>
                          <p className='truncate text-sm font-semibold text-foreground group-hover:text-primary'>
                            {attachment.name}
                          </p>
                          <p className='text-xs text-muted-foreground'>
                            {format(
                              new Date(attachment.uploadedAt),
                              'MMM dd, yyyy • h:mm a'
                            )}
                          </p>
                        </div>

                        <div className='flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100'>
                          {attachment.url && (
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-7 w-7 hover:bg-primary/10'
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(attachment.url, '_blank')
                              }}
                            >
                              <Download className='h-3.5 w-3.5' />
                            </Button>
                          )}
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-7 w-7 text-destructive hover:bg-destructive/10'
                            onClick={(e) => {
                              e.stopPropagation()
                              removeAttachment(index)
                            }}
                          >
                            <Trash2 className='h-3.5 w-3.5' />
                          </Button>
                        </div>
                      </div>

                      <div className='mt-2'>
                        <Input
                          placeholder='Add note (optional)...'
                          className='h-8 border-border bg-background text-xs'
                          value={attachment.note ?? ''}
                          onChange={(e) => updateNote(index, e.target.value)}
                        />
                      </div>

                      <div className='mt-2'>
                        <Input
                          type='date'
                          placeholder='Document date'
                          className='h-8 text-xs'
                          value={
                            attachment.documentDate
                              ? format(attachment.documentDate, 'yyyy-MM-dd')
                              : ''
                          }
                          onChange={(e) =>
                            updateDocumentDate(
                              index,
                              e.target.value
                                ? new Date(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className='mt-6 border-t border-border pt-4'>
            <Input
              ref={fileInputRef}
              type='file'
              multiple
              accept={accept}
              className='hidden'
              id='attachments-upload'
              onChange={(e) => {
                handleFiles(e.target.files)
                e.target.value = ''
              }}
            />

            <Button
              type='button'
              variant='outline'
              size='sm'
              className='w-full justify-start gap-2 border-dashed hover:border-primary hover:bg-primary/5'
              onClick={() => fileInputRef.current?.click()}
              disabled={attachments.length >= maxFiles}
            >
              <PlusCircle className='h-4 w-4 shrink-0' />
              <span className='text-xs font-medium'>Add Attachment(s)</span>
              <span className='ml-auto text-xs text-muted-foreground'>
                (max {maxFiles})
              </span>
            </Button>
          </div>
        </div>
      </div>
    )
  }
)
