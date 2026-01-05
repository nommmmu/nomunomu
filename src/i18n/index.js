import { createI18n } from 'vue-i18n'

// ブラウザの言語設定を取得
const getBrowserLocale = () => {
  const navigatorLocale =
    navigator.languages !== undefined
      ? navigator.languages[0]
      : navigator.language

  if (!navigatorLocale) {
    return 'ja'
  }

  const trimmedLocale = navigatorLocale.trim().split(/-|_/)[0]
  return trimmedLocale
}

const messages = {
  ja: {
    kaimonomemo: {
      title: '買い物メモ',
      subtitle: 'シンプルな買い物リスト管理アプリ',
      about: {
        title: 'アプリについて',
        description: '買い物メモは、日々の買い物をスムーズにするためのシンプルなアプリです。必要なものを素早く記録し、チェックリストとして活用できます。',
        featuresTitle: '主な機能',
        features: {
          list: '買い物リストの作成と管理',
          checkbox: 'チェックボックスで購入済みアイテムをマーク',
          edit: 'アイテムの追加・編集・削除が簡単',
          save: 'データの自動保存',
          design: '見やすいシンプルなデザイン'
        }
      },
      screenshots: {
        title: 'スクリーンショット'
      },
      download: {
        title: 'ダウンロード',
        description: 'App Storeで入手可能',
        appStore: 'App Store'
      },
      contact: {
        title: 'お問い合わせ',
        description: 'ご質問やサポートが必要な場合は、お気軽にお問い合わせください。'
      }
    }
  },
  en: {
    kaimonomemo: {
      title: 'Shopping Memo',
      subtitle: 'Simple Shopping List Management App',
      about: {
        title: 'About the App',
        description: 'Shopping Memo is a simple app to make your daily shopping smoother. Quickly record what you need and use it as a checklist.',
        featuresTitle: 'Key Features',
        features: {
          list: 'Create and manage shopping lists',
          checkbox: 'Mark purchased items with checkboxes',
          edit: 'Easy to add, edit, and delete items',
          save: 'Automatic data saving',
          design: 'Clean and simple design'
        }
      },
      screenshots: {
        title: 'Screenshots'
      },
      download: {
        title: 'Download',
        description: 'Available on the App Store',
        appStore: 'App Store'
      },
      contact: {
        title: 'Contact',
        description: 'If you have any questions or need support, please feel free to contact us.'
      }
    }
  },
  zh: {
    kaimonomemo: {
      title: '购物备忘录',
      subtitle: '简单的购物清单管理应用',
      about: {
        title: '关于应用',
        description: '购物备忘录是一个简单的应用，让您的日常购物更顺畅。快速记录需要的物品，并作为清单使用。',
        featuresTitle: '主要功能',
        features: {
          list: '创建和管理购物清单',
          checkbox: '用复选框标记已购买的物品',
          edit: '轻松添加、编辑和删除物品',
          save: '自动保存数据',
          design: '简洁的设计'
        }
      },
      screenshots: {
        title: '截图'
      },
      download: {
        title: '下载',
        description: 'App Store可供下载',
        appStore: 'App Store'
      },
      contact: {
        title: '联系我们',
        description: '如果您有任何问题或需要支持，请随时与我们联系。'
      }
    }
  },
  ko: {
    kaimonomemo: {
      title: '쇼핑 메모',
      subtitle: '간단한 쇼핑 리스트 관리 앱',
      about: {
        title: '앱 소개',
        description: '쇼핑 메모는 일상의 쇼핑을 원활하게 하기 위한 간단한 앱입니다. 필요한 것을 빠르게 기록하고 체크리스트로 활용할 수 있습니다.',
        featuresTitle: '주요 기능',
        features: {
          list: '쇼핑 리스트 생성 및 관리',
          checkbox: '체크박스로 구매한 항목 표시',
          edit: '항목 추가, 편집, 삭제가 간편',
          save: '데이터 자동 저장',
          design: '보기 쉬운 간단한 디자인'
        }
      },
      screenshots: {
        title: '스크린샷'
      },
      download: {
        title: '다운로드',
        description: 'App Store에서 이용 가능',
        appStore: 'App Store'
      },
      contact: {
        title: '문의',
        description: '질문이나 지원이 필요하시면 언제든지 문의해 주세요.'
      }
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: getBrowserLocale(),
  fallbackLocale: 'ja',
  messages
})

export default i18n
