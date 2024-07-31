import { ref, watch, type WatchStopHandle, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
// import { storeToRefs } from 'pinia'
// import { useSlidesStore } from '@/store'
import useImportPptx from '@/hooks/useImport'

export default function useImport(uploadInputSelector: string) {
  const router = useRouter()
  // const { theme, slides } = storeToRefs(useSlidesStore())
  const { importPPTXFile, exporting: isLoading } = useImportPptx()

  const isPopup = ref(false)
  const isDisabled = ref(true)
  let file: File | null = null
  let stop: WatchStopHandle | null = null

  function handleImport(e: Event) {
    if (e.type === 'click') {
      file && importPPTXFile([file] as unknown as FileList)
      stop = watch(isLoading, (val) => {
        if (!val) {
          router.push('/preview')
          // console.log('theme', theme.value)
          // console.log('slides', slides.value)
          stop && stop()
        }
      })
    } else {
      const files = document.querySelector<HTMLInputElement>(uploadInputSelector)?.files
      if (!files?.length) return
      file = files[0]
      isDisabled.value = false
    }
  }

  onUnmounted(() => {
    stop && stop()
  })

  return { isPopup, isDisabled, isLoading, handleImport }
}
