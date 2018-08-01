module.exports = { 
    URL: 'mongodb://localhost:27017/',
    DATABASE: 'ISInformationPlatform',
    forum: [
      {
        section_id: 1,
        post_collection: 'post_work',
        comment_collection: 'comment_work',
        title: '工作',
        type: [
          [
            { tag: '/static/面试.png', title: '面试', id: 0 },
            { tag: '/static/笔试.png', title: '笔试', id: 1 },
            { tag: '/static/实习经历.png', title: '实习', id: 2 },
            { tag: '/static/工作经历.png', title: '工作', id: 3 }
          ]
        ]
      },
      {
        section_id: 2,
        post_collection: 'post_abroad',
        comment_collection: 'comment_abroad',
        title: '出国',
        type: [
          [
            { tag: '全部', id: 0 },
            { tag: '美国', id: 1 },
            { tag: '英国', id: 2 },
            { tag: '加拿大', id: 3 },
            { tag: '澳大利亚', id: 4 },
            { tag: '其他', id: 5 }
          ],
          [
            { tag: '签证', id: 6 },
            { tag: '语言考试', id: 7 }
          ]
        ]
      },
      {
        section_id: 3,
        post_collection: 'post_graduate',
        comment_collection: 'comment_graduate',
        title: '读研',
        type: [
          [
            { tag: '本校', id: 0 },
            { tag: '外校', id: 1 }
          ],
          [
            { tag: '保研', id: 2 },
            { tag: '考验', id: 3 }
          ]
        ]
      }
    ],
    notice: [
      {
        section_id: 1,
        collection: "notice_normal",
        title: "公告"
      },
      {
        section_id: 2,
        collection: "notice_work",
        title: "实习信息"
      }
    ]
  };