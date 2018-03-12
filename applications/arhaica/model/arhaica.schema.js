{

  caption: 'Arhaica CMS Database Schema',
  version: 1,

  Language: {
    caption: 'Language',
    fields: {
      LanguageId:   { caption: 'Id',            type: 'id' },
      LanguageName: { caption: 'Language Name', type: 'str',  size: 32, nullable: false, index: { unique: true } },
      Sign:         { caption: 'Sign',          type: 'char', size: 2,  nullable: false, index: { unique: true } },
      ISO:          { caption: 'ISO Code',      type: 'char', size: 2,  nullable: false, index: { unique: true } },
      Caption:      { caption: 'Caption',       type: 'str',  size: 32, nullable: false, index: { unique: true } }
    }
  },

  Group: {
    caption: 'Groups',
    fields: {
      GroupId:   { caption: 'Id',   type: 'uid' },
      GroupName: { caption: 'Name', type: 'str', size: 64, nullable: false, index: { unique: true } }
    }
  },

  User: {
    caption: 'Users',
    fields: {
      UserId:   { caption: 'Id',        type: 'uid' },
      GroupId:  { caption: 'Group',     type: 'uid', master: { dataset: 'Group' } },
      Login:    { caption: 'Login',     type: 'str', size: 64, nullable: false, index: { unique: true } },
      Password: { caption: 'Password',  type: 'str', size: 64, nullable: false },
      FullName: { caption: 'Full Name', type: 'str', size: 255 }
    }
  },

  CmsTheme: {
    caption: 'Themes',
    fields: {
      ThemeId:   { caption: 'Id',         type: 'id' },
      ThemeName: { caption: 'Theme Name', type: 'str', size: 32, index: { unique: true } }
    }
  },

  CmsSite: {
    caption: 'Sites',
    fields: {
      SiteId:     { caption: 'Id',          type: 'uid' },
      OwnerId:    { caption: 'Owner',       type: 'uid',              master: { dataset: 'User', key: 'UserId' } },
      ThemeId:    { caption: 'Theme',       type: 'id',               link:   { dataset: 'CmsTheme' } },
      LanguageId: { caption: 'Language',    type: 'id', default: '1', link:   { dataset: 'Language' } },
      DomainName: { caption: 'Domain Name', type: 'str', size: 64,    index:  { unique: true } },
      Analytics:  { caption: 'Analytics',   type: 'str', size: 32 }
    }
  },

  CmsSiteProp: {
    caption: 'Properties',
    fields: {
      SitePropId: { caption: 'Id',         type: 'id' },
      SiteId:     { caption: 'Site',       type: 'uid', master: { dataset: 'CmsSite' } },
      LanguageId: { caption: 'Language',   type: 'id',  link:   { dataset: 'Language' } },
      Title:      { caption: 'Identifier', type: 'str', size: 255 },
      Subtitle:   { caption: 'Subtitle',   type: 'str', size: 255 },
      Copyright:  { caption: 'Copyright',  type: 'str', size: 255 }
    },
    indexes: {
      akCmsSiteProp: { fields: [ 'SiteId', 'LangiageId' ], unique: true }
    }
  },

  CmsSitePage: {
    caption: 'Pages',
    fields: {
      PageId:       { caption: 'Id',      type: 'id' },
      ParentPageId: { caption: 'Parent',  type: 'tree' },
      SiteId:       { caption: 'Site',    type: 'uid', master: { dataset: 'CmsSite' } },
      Order:        { caption: 'Order',   type: 'int', signed: false, nullable: false, default: '1' },
      PageType:     { caption: 'Type',    type: 'char', size: 1, default: 'P', lookup: { dictionary: {
        'P': 'Page', 'N': 'News', 'C': 'Catalog', 'A': 'Album'
      } } },
      Visible:      { caption: 'Visible', type: 'char', size: 1, default: 'V', lookup: { dictionary: {
        'V': 'Visible', 'H': 'Hidden'
      } } },
      PubDate:      { caption: 'PubDate', type: 'datetime', nullable: false, default: 'now', index: { unique: false } }
    }
  },

  CmsContent: {
    caption: 'Content',
    fields: {
      ContentId:   { caption: 'Id',          type: 'id' },
      SiteId:      { caption: 'Site',        type: 'uid', master: { dataset: 'CmsSite' } },
      PageId:      { caption: 'Page',        type: 'id',  link:   { dataset: 'CmsSitePage' } },
      LanguageId:  { caption: 'Language',    type: 'id',  link:   { dataset: 'Language' } },
      Priority:    { caption: 'Priority',    type: 'int', signed: false, nullable: false, default: '5' },
      PageName:    { caption: 'Name',        type: 'str', size: 128, nullable: false, index: { unique: false } },
      Caption:     { caption: 'Caption',     type: 'str', size: 128 },
      Subtitle:    { caption: 'Subtitle',    type: 'str', size: 128 },
      Title:       { caption: 'Title',       type: 'str', size: 255 },
      Description: { caption: 'Description', type: 'str', size: 255 },
      Keywords:    { caption: 'Keywords',    type: 'str', size: 255 },
      Content:     { caption: 'Content',     type: 'text' }
    },
    indexes: {
      akCmsContentPage: { fields: [ 'PageId', 'LangiageId' ], unique: true },
      akCmsContentSite: { fields: [ 'SiteId', 'PageName', 'LangiageId' ], unique: true }
    }
  },

  CmsComment: {
    caption: 'Comment',
    fields: {
      CommentId:   { caption: 'Id',       type: 'id' },
      PageId:      { caption: 'Page',     type: 'id', link: { dataset: 'CmsSitePage' } },
      LanguageId:  { caption: 'Language', type: 'id', link: { dataset: 'Language' } },
      ThreadId:    { caption: 'Thread',   type: 'tree' },
      PostDate:    { caption: 'Date',     type: 'datetime', nullable: false, default: 'now', index: { unique: false } },
      IpAddress:   { caption: 'IP',       type: 'ip',                                        index: { unique: false } },
      MessageHash: { caption: 'Hash',     type: 'hash',     nullable: false,                 index: { unique: true } },
      Flag:        { caption: 'Flag',     type: 'char', size: 1, default: 'V', lookup: { dictionary: {
        'V': 'Visible', 'B': 'Blocked', 'H': 'Hidden'
      } } },
      NicName:     { caption: 'Name',     type: 'str', size: 64, index: { unique: false } },
      Content:     { caption: 'Content',  type: 'text' }
    },
    indexes: {
      idxCmsComment: { fields: [ 'PageId', 'LanguageId' ], unique: false }
    }
  },

  CmsFile: {
    caption: 'File',
    fields: {
      FileId:       { caption: 'Id',          type: 'id' },
      SiteId:       { caption: 'Site',        type: 'uid',                   link:  { dataset: 'CmsSite' } },
      Hash:         { caption: 'Hash',        type: 'hash', nullable: false, index: { unique: true } },
      StorageSize:  { caption: 'Storage',     type: 'int',  nullable: false },
      OriginalSize: { caption: 'Size',        type: 'int',  nullable: false },
      Downloads:    { caption: 'Downloads',   type: 'int',  nullable: false, default: '0' },
      UploadTime:   { caption: 'UploadTime',  type: 'datetime', nullable: false, default: 'now', index: { unique: false } },
      Flag:         { caption: 'Flag',        type: 'char', size: 1, default: 'U', nullable: false, index: { unique: false }, lookup: { dictionary: {
        'U': 'Uploaded', 'A': 'Available after antivirus check', 'B': 'Blocked', 'M': 'Marked for deletion', 'R': 'Removed', 'V': 'Virus'
      } } },
      Compression:  { caption: 'Compression', type: 'char', size: 1, default: 'N', nullable: false, index: { unique: false }, lookup: { dictionary: {
        'N': 'None', 'Z': 'ZIP', 'G': 'GZIP', 'I': 'Image'
      } } },
      Extension:    { caption: 'Extension',   type: 'str', size: 8,    nullable: false },
      OriginalName: { caption: 'Name',        type: 'str', size: 1024, nullable: false },
      IpAddress:    { caption: 'IP Address',  type: 'ip',              nullable: false, index: { unique: false } }
    }
  }

}
