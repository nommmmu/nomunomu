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
    },
    privacy: {
      title: 'プライバシーポリシー',
      lastUpdated: '最終更新日',
      overview: {
        title: '概要',
        content: 'このプライバシーポリシーは、買い物メモアプリ（以下「当アプリ」）がユーザーの個人情報をどのように収集、使用、保護するかについて説明します。'
      },
      collection: {
        title: '収集する情報',
        intro: '当アプリは以下の情報を収集する場合があります：',
        items: {
          usage: 'アプリの使用状況データ（どの機能が使用されているかなど）',
          device: 'デバイス情報（OSバージョン、デバイスタイプなど）',
          contact: 'ユーザーが任意で提供する連絡先情報'
        }
      },
      usage: {
        title: '情報の使用目的',
        items: {
          improvement: 'アプリの機能改善とユーザーエクスペリエンスの向上',
          support: 'カスタマーサポートの提供',
          communication: 'アプリに関する重要な通知の送信'
        }
      },
      storage: {
        title: 'データの保存',
        content: '買い物リストのデータは、お使いのデバイスにローカルに保存されます。当社のサーバーには送信されません。'
      },
      thirdParty: {
        title: '第三者への情報提供',
        content: '当アプリは、法律で義務付けられている場合を除き、ユーザーの個人情報を第三者と共有することはありません。'
      },
      security: {
        title: 'セキュリティ',
        content: 'ユーザーの情報を保護するため、業界標準のセキュリティ対策を実施しています。'
      },
      changes: {
        title: 'プライバシーポリシーの変更',
        content: '当アプリは、必要に応じてこのプライバシーポリシーを更新する場合があります。変更があった場合は、アプリ内またはウェブサイトでお知らせします。'
      },
      contact: {
        title: 'お問い合わせ',
        content: 'プライバシーポリシーに関するご質問がある場合は、以下の連絡先までお問い合わせください：'
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
    },
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated',
      overview: {
        title: 'Overview',
        content: 'This Privacy Policy explains how the Shopping Memo app (hereinafter "the App") collects, uses, and protects user information.'
      },
      collection: {
        title: 'Information We Collect',
        intro: 'The App may collect the following information:',
        items: {
          usage: 'App usage data (such as which features are used)',
          device: 'Device information (OS version, device type, etc.)',
          contact: 'Contact information voluntarily provided by users'
        }
      },
      usage: {
        title: 'How We Use Information',
        items: {
          improvement: 'Improve app functionality and user experience',
          support: 'Provide customer support',
          communication: 'Send important notifications about the app'
        }
      },
      storage: {
        title: 'Data Storage',
        content: 'Shopping list data is stored locally on your device. It is not sent to our servers.'
      },
      thirdParty: {
        title: 'Third-Party Disclosure',
        content: 'The App does not share user personal information with third parties, except as required by law.'
      },
      security: {
        title: 'Security',
        content: 'We implement industry-standard security measures to protect user information.'
      },
      changes: {
        title: 'Changes to Privacy Policy',
        content: 'The App may update this Privacy Policy as needed. Changes will be announced within the app or on our website.'
      },
      contact: {
        title: 'Contact Us',
        content: 'If you have any questions about this Privacy Policy, please contact us at:'
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
    },
    privacy: {
      title: '隐私政策',
      lastUpdated: '最后更新',
      overview: {
        title: '概述',
        content: '本隐私政策说明购物备忘录应用程序（以下简称"本应用"）如何收集、使用和保护用户信息。'
      },
      collection: {
        title: '我们收集的信息',
        intro: '本应用可能会收集以下信息：',
        items: {
          usage: '应用使用数据（例如使用了哪些功能）',
          device: '设备信息（操作系统版本、设备类型等）',
          contact: '用户自愿提供的联系信息'
        }
      },
      usage: {
        title: '信息使用方式',
        items: {
          improvement: '改善应用功能和用户体验',
          support: '提供客户支持',
          communication: '发送有关应用的重要通知'
        }
      },
      storage: {
        title: '数据存储',
        content: '购物清单数据存储在您的设备本地，不会发送到我们的服务器。'
      },
      thirdParty: {
        title: '第三方披露',
        content: '除非法律要求，本应用不会与第三方共享用户个人信息。'
      },
      security: {
        title: '安全性',
        content: '我们采用行业标准的安全措施来保护用户信息。'
      },
      changes: {
        title: '隐私政策变更',
        content: '本应用可能会根据需要更新本隐私政策。变更将在应用内或我们的网站上公布。'
      },
      contact: {
        title: '联系我们',
        content: '如果您对本隐私政策有任何疑问，请通过以下方式联系我们：'
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
    },
    privacy: {
      title: '개인정보 보호정책',
      lastUpdated: '최종 업데이트',
      overview: {
        title: '개요',
        content: '본 개인정보 보호정책은 쇼핑 메모 앱(이하 "본 앱")이 사용자 정보를 수집, 사용 및 보호하는 방법을 설명합니다.'
      },
      collection: {
        title: '수집하는 정보',
        intro: '본 앱은 다음 정보를 수집할 수 있습니다:',
        items: {
          usage: '앱 사용 데이터(어떤 기능이 사용되는지 등)',
          device: '기기 정보(OS 버전, 기기 유형 등)',
          contact: '사용자가 자발적으로 제공하는 연락처 정보'
        }
      },
      usage: {
        title: '정보 사용 방법',
        items: {
          improvement: '앱 기능 개선 및 사용자 경험 향상',
          support: '고객 지원 제공',
          communication: '앱에 관한 중요한 알림 전송'
        }
      },
      storage: {
        title: '데이터 저장',
        content: '쇼핑 리스트 데이터는 사용자의 기기에 로컬로 저장됩니다. 당사 서버로 전송되지 않습니다.'
      },
      thirdParty: {
        title: '제3자 공개',
        content: '본 앱은 법률에 의해 요구되는 경우를 제외하고 사용자 개인정보를 제3자와 공유하지 않습니다.'
      },
      security: {
        title: '보안',
        content: '사용자 정보를 보호하기 위해 업계 표준 보안 조치를 시행합니다.'
      },
      changes: {
        title: '개인정보 보호정책 변경',
        content: '본 앱은 필요에 따라 본 개인정보 보호정책을 업데이트할 수 있습니다. 변경 사항은 앱 내 또는 웹사이트에서 공지됩니다.'
      },
      contact: {
        title: '문의하기',
        content: '본 개인정보 보호정책에 대해 질문이 있으시면 다음 연락처로 문의해 주세요:'
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
