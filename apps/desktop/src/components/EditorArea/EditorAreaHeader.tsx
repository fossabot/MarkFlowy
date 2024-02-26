import { memo, useCallback, useRef } from 'react'
import { MfIconButton } from '../UI/Button'
import { useCommandStore, useEditorStore } from '@/stores'
import { getFileObject } from '@/helper/files'
import useBookMarksStore from '@/extensions/bookmarks/useBookMarksStore'
import { showContextMenu } from '../UI/ContextMenu'
import { emit } from '@tauri-apps/api/event'

export const EditorAreaHeader = memo(() => {
  const { activeId, getEditorDelegate } = useEditorStore()
  const { execute } = useCommandStore()
  const ref = useRef<HTMLDivElement>()
  const curFile = activeId ? getFileObject(activeId) : undefined

  const handleAddBookMark = useCallback(() => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect === undefined) return
    const { findMark } = useBookMarksStore.getState()
    const curBookMark = findMark(curFile?.path || '')
    const editDelegate = getEditorDelegate(curFile?.id || '')

    showContextMenu({
      x: rect.x + rect.width,
      y: rect.y + rect.height,
      items: [
        {
          label: 'BookMark',
          value: 'BookMark',
          checked: curBookMark !== undefined,
          handler: () => {
            if (curBookMark) {
              execute('edit_bookmark_dialog', curBookMark)
            } else {
              execute('open_bookmark_dialog', curFile)
            }
          },
        },
        {
          label: 'View',
          value: 'view',
          children: [
            {
              label: 'Source Code',
              value: 'sourceCode',
              checked: editDelegate?.view === 'SourceCode',
              handler: () => emit('editor_toggle_type', 'sourceCode'),
            },
            {
              label: 'Wysiwyg View',
              value: 'wysiwyg',
              checked: editDelegate?.view === 'Wysiwyg',
              handler: () => emit('editor_toggle_type', 'wysiwyg'),
            },
          ],
        },
      ],
    })
  }, [curFile, getEditorDelegate, execute])

  return (
    <div className='editor-area-header'>
      {curFile ? (
        <MfIconButton
          iconRef={ref}
          icon={'ri-more-2-fill'}
          onClick={handleAddBookMark}
        />
      ) : null}
    </div>
  )
})
