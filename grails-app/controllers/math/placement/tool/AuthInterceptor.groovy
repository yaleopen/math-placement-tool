package math.placement.tool


class AuthInterceptor {

    AuthInterceptor() {
        matchAll().excludes(uri: "/launch/**").excludes(uri: "/")
    }

    boolean before() {
        if (!session.oauthSignature) {
            render(status: 401, text: 'Access denied')
            return false
        }
        true
    }

    boolean after() { true }

    void afterView() {
        // no-op
    }
}
