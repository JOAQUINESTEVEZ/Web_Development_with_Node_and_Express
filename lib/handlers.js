exports.home = (req, res) => {
    res.render('home')
}

exports.sectionTest = (req, res) => {
    res.render('section-test')
}

exports.newsletterSignUp = (req, res) => {
    res.render('newsletter-signup', { csrf: 'CSRF token goes here'})
}

exports.newsletterSignUpProcess = (req, res) => {
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.redirect(303, '/newsletter-signup/thank-you')
}

exports.newsletterSignupThankYou = (req, res) => {
    res.render('newsletter-signup-thank-you')
}

exports.notFound = (req, res) => res.render('404')

exports.serverError = (err, req, res, next) => res.render('500')