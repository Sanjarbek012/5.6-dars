const { body, param } = require('express-validator');



const registerValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Ism bo\'sh bo\'lishi mumkin emas')
    .isLength({ min: 2, max: 50 }).withMessage('Ism 2-50 ta belgi orasida bo\'lishi kerak')
    .matches(/^[a-zA-ZÀ-ÿ\u0400-\u04FF\s'-]+$/).withMessage('Ism faqat harflardan iborat bo\'lishi kerak'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email bo\'sh bo\'lishi mumkin emas')
    .isEmail().withMessage('Noto\'g\'ri email format')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Parol bo\'sh bo\'lishi mumkin emas')
    .isLength({ min: 6 }).withMessage('Parol kamida 6 ta belgidan iborat bo\'lishi kerak')
    .isLength({ max: 100 }).withMessage('Parol 100 ta belgidan oshmasligi kerak')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage(
      'Parolda kamida 1 ta katta harf, 1 ta kichik harf va 1 ta raqam bo\'lishi kerak'
    ),

  body('confirmPassword')
    .notEmpty().withMessage('Parolni tasdiqlash majburiy')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Parollar mos kelmadi');
      }
      return true;
    }),
];



const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email bo\'sh bo\'lishi mumkin emas')
    .isEmail().withMessage('Noto\'g\'ri email format')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Parol bo\'sh bo\'lishi mumkin emas'),
];


const verifyEmailValidator = [
  param('token')
    .notEmpty().withMessage('Token majburiy')
    .isUUID().withMessage('Noto\'g\'ri token format'),
];


const bookValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('Kitob nomi majburiy')
    .isLength({ min: 1, max: 200 }).withMessage('Kitob nomi 1-200 ta belgi orasida bo\'lishi kerak'),

  body('author')
    .trim()
    .notEmpty().withMessage('Muallif ismi majburiy')
    .isLength({ min: 2, max: 100 }).withMessage('Muallif ismi 2-100 ta belgi orasida bo\'lishi kerak'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Tavsif 2000 ta belgidan oshmasligi kerak'),

  body('genre')
    .optional()
    .isIn(['roman', 'ilmiy', 'tarix', 'falsafa', 'she\'riyat', 'boshqa'])
    .withMessage('Noto\'g\'ri janr tanlandi'),

  body('publishedYear')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(`Yil 1000 va ${new Date().getFullYear()} orasida bo\'lishi kerak`),
];


const quoteValidator = [
  body('text')
    .trim()
    .notEmpty().withMessage('Iqtibos matni majburiy')
    .isLength({ min: 5, max: 1000 }).withMessage('Iqtibos 5-1000 ta belgi orasida bo\'lishi kerak'),

  body('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Sahifa raqami 1 dan katta bo\'lishi kerak'),
];

module.exports = {
  registerValidator,
  loginValidator,
  verifyEmailValidator,
  bookValidator,
  quoteValidator,
};
