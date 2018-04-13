package com.instructure.canvas

import grails.gorm.transactions.Transactional
import grails.plugins.rest.client.RestResponse
import org.grails.web.json.JSONArray
import org.springframework.beans.factory.annotation.Value

@Transactional
class CanvasAPIBaseService {

    def restClient
    @Value('${canvas.canvasBaseUrl}')
    String canvasBaseURL
    @Value('${canvas.oauthToken}')
    String oauthToken
    @Value('${canvas.perPageLimit}')
    String perPageLimit


    def <T> void processResponsePages(RestResponse resp, List<T> firstPage) {
        def nextPage = canvasNextPage(resp)
        while (nextPage != null) {
            resp = restClient.get(nextPage) {
                auth('Bearer ' + oauthToken)
            }
            log.info("ACTION=External_API DESCRIPTION=Paging REQUEST_URL=${nextPage} HTTP_STATUS=${resp.status}")
            firstPage.addAll((JSONArray) resp.json)
            nextPage = canvasNextPage(resp)
        }
    }

    static def canvasNextPage(RestResponse resp) {
        String linkHeader = resp.headers.getFirst('Link')
        String nextLink = null
        if (linkHeader != null) {
            String[] links = linkHeader.split(',')
            for (link in links) {
                String[] linkParts = link.split(';')
                String relVal = linkParts[0]
                String relType = linkParts[1]
                if (relType.contains('next')) {
                    nextLink = relVal.substring(1, relVal.length() - 1)
                    break
                }
            }
        }
        if (nextLink) {
            return URLDecoder.decode(nextLink, "UTF-8")
        }
        return nextLink
    }
}
